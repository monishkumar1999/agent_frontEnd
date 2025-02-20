import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { createSocketConnection } from "../../../../utils/socket";
import { getUserIdFromCookies } from "../../../../utils/auth";
import { NOPROFILE } from "../../../../utils/imgpath";
import axiosInstance from "../../../../utils/axiosInstance";
import ChatWindow from "./ChatWindow";


const AgentChatbox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef(null);
  const userId = getUserIdFromCookies();
  const targetId = "677b9e1e983e06021b031dc8"; // Example targetId for admin chat
  const chatWindowRef = useRef(null);

  useEffect(() => {
    if (!userId || !targetId) return;

    if (!socketRef.current) {
      socketRef.current = createSocketConnection();
    }
    const socket = socketRef.current;

    // Fetch previous messages
    const fetchChat = async () => {
      try {
        const response = await axiosInstance.get(`/chat/get-message/${userId}/${targetId}`);
        setMessages(response.data.messages || []);
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };
    fetchChat();

    // Join chat when the component mounts
    socket.emit("joinChat", { userId, targetId });

    // Listen for new messages
    socket.on("messageReceived", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Cleanup on unmount
    return () => {
      socket.emit("leaveChat", { userId });
      socket.off("messageReceived");
    };
  }, [userId, targetId]);

  const handleSend = () => {
    if (!input.trim() || !socketRef.current) return;

    const newMessage = { userId, targetId, message: input.trim(), timestamp: new Date().toISOString() };

    // Emit the new message to the server
    socketRef.current.emit("sendMessage", newMessage);

    setInput(""); // Clear input field
  };

  // Scroll to the bottom of the chat when a new message is received
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Admin Card on the Left Side */}
      <div className="w-1/4 bg-white p-6 shadow-lg rounded-lg flex flex-col items-center">
        <div className="relative">
          <img
            src={NOPROFILE}
            alt="Admin Avatar"
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />
          {/* Green Dot for Online Status */}
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mt-3">Admin</h2>
        <p className="text-sm text-green-600 font-medium">Online</p>
      </div>

      {/* Chat Window on the Right Side */}
      <div className="flex-1 bg-gray-50 p-6 flex flex-col">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Admin Chat</h2>

        {/* Chat Messages */}
        <div
          ref={chatWindowRef}
          className="flex-grow bg-white p-5 mt-6 rounded-lg shadow-md overflow-y-auto"
          style={{ maxHeight: "60vh" }}
        >
          <ChatWindow messages={messages} userId={userId} />
        </div>

        {/* Message Input */}
        <div className="flex items-center mt-4 bg-white p-3 rounded-lg shadow-md">
          <input
            type="text"
            className="flex-grow p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition"
            onClick={handleSend}
            disabled={!input.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentChatbox;