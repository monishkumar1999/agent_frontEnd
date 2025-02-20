import React, { useRef, useEffect } from "react";
import { NOPROFILE } from "../../../../utils/imgpath";

const ChatWindow = ({ messages, userId }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-grow overflow-y-auto bg-white shadow-md rounded-lg p-4 mb-4 space-y-4">
      {messages.length === 0 ? (
        <p className="text-gray-500 text-center">No messages yet.</p>
      ) : (
        messages.map((msg, index) => {
          const formattedTime = new Date(msg.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div key={index} className={`chat ${msg.sender === userId ? "chat-end" : "chat-start"}`}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img alt="User Avatar" src={NOPROFILE} />
                </div>
              </div>
              <div className="chat-bubble">
                {msg.message}
                <div className="text-xs text-gray-500 mt-1">{formattedTime}</div>
              </div>
            </div>
          );
        })
      )}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatWindow;
