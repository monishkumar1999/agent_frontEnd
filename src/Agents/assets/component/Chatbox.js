import React, { useState } from "react";
import { FaSearch, FaPaperPlane, FaPaperclip, FaImage } from "react-icons/fa";


const Chatbox = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const contacts = [
    { id: 1, name: "John Deo", role: "Marketing Manager", avatar: "/images/prof.png" },
    { id: 2, name: "Jane Smith", role: "Sales Lead", avatar: "/images/prof.png" },
    { id: 3, name: "Alex Johnson", role: "Support Agent", avatar: "/images/prof.png" },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [...prevMessages, { text: message, sender: "You" }]);
      setMessage("");
      setIsTyping(false);
    }
  };

  return (
    <div>
      
      <div className="w-1/4 bg-white p-4 border-r">
        <h2 className="text-xl font-semibold mb-4">Chat App</h2>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search contacts"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          />
          <FaSearch className="absolute top-3 right-3 text-gray-400" />
        </div>
        <h4 className="text-sm text-gray-600 mb-2">Recent Chats</h4>
        <div>
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
                selectedChat?.id === contact.id ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedChat(contact)}
            >
              <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full" />
              <div>
                <h3 className="font-medium">{contact.name}</h3>
                <p className="text-xs text-gray-500">{contact.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-3/4 flex flex-col bg-white p-6">
        {selectedChat ? (
          <>
            <h2 className="text-lg font-semibold mb-2">Chat with {selectedChat.name}</h2>
            <div className="flex-1 bg-gray-50 p-4 rounded-lg overflow-auto">
              {messages.map((msg, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && <p className="text-gray-500 text-sm">Typing...</p>}
            </div>

            <div className="flex items-center gap-2 mt-4 border-t pt-3">
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setIsTyping(e.target.value.length > 0);
                }}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none"
              />
              <FaImage className="text-gray-600 cursor-pointer hover:text-blue-500" />
              <FaPaperclip className="text-gray-600 cursor-pointer hover:text-blue-500" />
              <FaPaperPlane
                className="text-blue-500 cursor-pointer hover:text-blue-700"
                onClick={handleSendMessage}
              />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1">
            <h3 className="text-gray-500 text-lg">Select a chat to start messaging</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbox;