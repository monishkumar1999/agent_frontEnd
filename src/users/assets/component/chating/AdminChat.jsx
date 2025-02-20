import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { createSocketConnection } from "../../../../utils/socket";
import { getUserIdFromCookies } from "../../../../utils/auth";
import { NOPROFILE } from "../../../../utils/imgpath";
import axiosInstance from "../../../../utils/axiosInstance";
import ChatWindow from "./ChatWindow";

const AdminChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef(null);
  const userId = getUserIdFromCookies();
  const targetId = "677b9e1e983e06021b031dc8";

  useEffect(() => {
    if (!userId || !targetId) return;

    if (!socketRef.current) {
      socketRef.current = createSocketConnection();
    }
    const socket = socketRef.current;

    const fetchChat = async () => {
      try {
        const response = await axiosInstance.get(
          `/chat/get-message/${userId}/${targetId}`
        );
        setMessages(response.data.messages || []);
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };
    fetchChat();

    socket.emit("joinChat", { userId, targetId });
    socket.on("messageReceived", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.emit("leaveChat", { userId });
      socket.off("messageReceived");
    };
  }, [userId, targetId]);

  const handleSend = () => {
    if (!input.trim() || !socketRef.current) return;

    const newMessage = {
      userId,
      targetId,
      message: input.trim(),
      timestamp: new Date().toISOString(),
    };

    // Emit message to server
    socketRef.current.emit("sendMessage", newMessage);

    setInput(""); // Clear input field
  };

  return (
    <div className="flex flex-col h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Admin Chat</h2>
      <ChatWindow messages={messages} userId={userId} />
      <div className="flex items-center">
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
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default AdminChat;
