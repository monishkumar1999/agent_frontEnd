import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import useChatSocket from "./useChatSocket";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "../adminchat/ChatWindow";
import { getUserIdFromCookies } from "../../../../../utils/auth";
import axiosInstance from "../../../../../utils/axiosInstance";
import { Send } from "lucide-react";

const Userchat = () => {
  const { targetId } = useParams();
  const userId = getUserIdFromCookies();

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [receiverName, setReceiverName] = useState("");
  const [input, setInput] = useState("");
  const chatWindowRef = useRef(null);
  const socket = useChatSocket(userId, targetId, setMessages);

  useEffect(() => {
    if (!userId) return;

    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/admin/users-view");
        if (response.data?.data) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [userId]);

  useEffect(() => {
    if (!userId || !targetId) return;

    const fetchChat = async () => {
      try {
        const response = await axiosInstance.get(`/chat/get-message/${userId}/${targetId}`);
        setMessages(response.data.messages || []);
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };

    const fetchReceiverName = async () => {
      try {
        const response = await axiosInstance.post("/admin/user-name", { userid: targetId });
        if (response.data?.data?.userName) {
          setReceiverName(response.data.data.userName);
        }
      } catch (error) {
        console.error("Error fetching receiver name:", error);
        setReceiverName("Unknown User");
      }
    };

    fetchChat();
    fetchReceiverName();
  }, [targetId, userId]);

  const handleSend = () => {
    if (!input.trim() || !socket) return;

    const newMessage = { userId, targetId, message: input.trim(), timestamp: new Date().toISOString() };

    // Emit the new message to the server
    socket.emit("sendMessage", newMessage);
    setMessages((prev) => [...prev, { text: input, sender: "You" }]); // Update local messages
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
      <ChatSidebar users={users} targetId={targetId} />

      {/* Chat Window */}
      <div className="flex-1 bg-gray-50 p-6 flex flex-col">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Chat with {receiverName}</h2>

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

export default Userchat;