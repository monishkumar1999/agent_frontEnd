import { useEffect, useRef } from "react";
import { NOPROFILE } from "../../../../../utils/imgpath";

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
          const isSender = msg.sender === userId;
          const formattedTime = new Date(msg.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div key={index} className={`chat ${isSender ? "chat-end" : "chat-start"}`}>
              <div className="chat-image avatar">
                <div className="w-10 h-10 rounded-full overflow-hidden shadow-2xl">
                  <img alt="User Avatar" src={NOPROFILE} className="object-cover" />
                </div>
              </div>
              <div
                className={`chat-bubble max-w-xs px-4 py-3 rounded-xl shadow-md font-bold ${
                  isSender ? "bg-gray-500 text-white" : "bg-blue-400 text-white"
                }`}
              >
                {msg.message}
                <div className="text-xs text-gray-800 mt-1 text-right">{formattedTime}</div>
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
