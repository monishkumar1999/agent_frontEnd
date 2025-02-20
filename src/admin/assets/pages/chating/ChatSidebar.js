import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserIdFromCookies } from "../../../../utils/auth";
import axiosInstance from "../../../../utils/axiosInstance";
import { NOPROFILE } from "../../../../utils/imgpath";

const ChatSidebar = ({ targetId }) => {
  const [chats, setChats] = useState([]);
  const userId = getUserIdFromCookies();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentChats = async () => {
      try {
        const response = await axiosInstance.get(`/chat/recent-chats/${userId}`);
        setChats(response.data.chats);
      } catch (error) {
        console.error("Error fetching recent chats:", error);
      }
    };

    fetchRecentChats();
  }, [userId]);

  return (
    <div className="w-1/4 bg-white shadow-md p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.receiverId}
            onClick={() => navigate(`/admin/chat/${chat.receiverId}`)}
            className={`p-3 cursor-pointer rounded-lg flex items-center gap-3 transition ${
              chat.receiverId === targetId ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
          >
            <img
              src={chat.profileImage || NOPROFILE}
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <p className="font-medium">{chat.userName}</p>
              <p className="text-gray-500 text-sm truncate">{chat.lastMessage}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;
