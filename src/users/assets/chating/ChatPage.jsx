import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../../utils/socket";
import { getUserIdFromCookies } from "../../../utils/auth";

// Custom Hook for handling socket events
const useChatSocket = (userId, targetId, setMessages) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId || !targetId) return;

    socketRef.current = createSocketConnection();
    const socket = socketRef.current;

    socket.emit("joinChat", { userId, targetId });

    socket.on("joinSuccess", (roomId) => {
      console.log(`✅ Joined chat room: ${roomId}`);
    });

    socket.on("messageReceived", ({ sender, message }) => {
      setMessages((prev) => [...prev, { sender, message }]);
    });

    socket.on("joinError", (error) => {
      console.error("❌ Error joining chat:", error);
    });

    return () => {
      socket.disconnect();
      socket.off("joinSuccess");
      socket.off("messageReceived");
      socket.off("joinError");
    };
  }, [userId, targetId, setMessages]);

  return socketRef.current; // ✅ Return the socket instance, not ref
};

const ChatPage = () => {
  const { targetId } = useParams(); // Get target user ID from URL
  const userId = "67b48f04fb52c524f49ac383"; // Get logged-in user ID
  const [messages, setMessages] = useState([]); // ✅ Fixed state name
  const [newMessage, setNewMessage] = useState("");

  const socket = useChatSocket(userId, targetId, setMessages); // ✅ Use the actual socket

  const sendMessage = () => {
    if (!newMessage.trim() || !socket) return;

    const timestamp = new Date().toISOString(); // ✅ Define timestamp
    const messageData = { userId, targetId, message: newMessage, timestamp };

    socket.emit("sendMessage", messageData);

    // Add message to UI instantly
    setMessages((prev) => [...prev, { sender: userId, message: newMessage, timestamp }]);
    setNewMessage(""); // Clear input field
  };

  return (
    <div className="flex flex-col h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Chat with User {targetId}</h2>

      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto bg-white shadow-md rounded-lg p-4 mb-4">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${
                msg.sender === userId ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-gray-800 self-start"
              }`}
            >
              <strong>{msg.sender === userId ? "You" : "User"}</strong>: {msg.message}
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <div className="flex items-center">
        <input
          type="text"
          className="flex-grow p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
