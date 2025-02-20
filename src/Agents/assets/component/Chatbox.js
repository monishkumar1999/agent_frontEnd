import React, { useState } from "react";
import { Send } from "lucide-react";
import AgentNavbar from "./AgentNavbar";

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const user = {
    name: "John Doe",
    username: "johndoe",
    email: "johndoe@example.com",
    profilePic: "https://api.dicebear.com/7.x/adventurer/svg?seed=Businessman",
  };

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <header><AgentNavbar/>
    <div className="flex h-screen bg-gray-100">
        
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-5 shadow-md flex flex-col items-center">
        <img
          src={user.profilePic}
          alt="Profile Avatar"
          className="w-20 h-20 rounded-full border border-gray-300 mb-4"
        />
        <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
        <p className="text-sm text-gray-600">@{user.username}</p>
        <p className="text-xs text-gray-500">{user.email}</p>
      </div>
      

      {/* Chat Section */}
      <div className="flex-1 flex flex-col justify-between p-5">
        
        {/* Chat Display */}
        <div className="flex-1 overflow-y-auto bg-white p-4 shadow-md rounded-lg">
          {messages.length === 0 ? (
            <p className="text-gray-400 text-center">No messages yet...</p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className="bg-blue-500 text-white p-2 rounded-lg w-fit mb-2 self-end"
              >
                {msg}
              </div>
            ))
          )}
        </div>

        {/* Input Box */}
        <div className="flex items-center bg-white p-3 mt-3 rounded-lg shadow-md">
          <input
            type="text"
            className="flex-1 p-2 border rounded-lg focus:outline-none"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="ml-3 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
    </header>
  );
};

export default Chatbox;
