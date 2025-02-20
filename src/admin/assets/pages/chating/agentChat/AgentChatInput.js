import React, { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

const AgentChatInput = ({ sendMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="flex items-center border rounded-lg  bg-white shadow-md">
      <input
        type="text"
        className="flex-grow p-3 border-none focus:outline-none focus:ring-0"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button
        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition flex items-center justify-center"
        onClick={handleSend}
      >
        <PaperAirplaneIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default AgentChatInput;
