import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useChatSocket from "./useChatSocket";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import { getUserIdFromCookies } from "../../../../utils/auth";
import axiosInstance from "../../../../utils/axiosInstance";

const ChatPage = () => {
  const { targetId } = useParams();
  const userId = getUserIdFromCookies();


  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [receiverName, setReceiverName] = useState("");

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

  const sendMessage = (message) => {
    if (!message.trim()) return;
  
    const timestamp = new Date().toISOString();
    const messageData = { userId, targetId, message, timestamp };
  
    socket.emit("sendMessage", messageData);
    
    // ❌ Remove manual setMessages here to prevent duplication
    // setMessages((prev) => [...prev, { sender: userId, message, timestamp }]);
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      <ChatSidebar users={users} targetId={targetId} />
      <div className="w-3/4 flex flex-col p-6 bg-gray-50">
      {targetId && (
          <>
            <ChatWindow messages={messages} userId={userId} />
            <ChatInput sendMessage={sendMessage} />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
