import React, { useState, useEffect } from 'react';
import { createSocketConnection } from '../utils/socket';
import { useParams } from 'react-router-dom';

const Chat = () => {
    const socket = createSocketConnection();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const params = useParams();
    const userId = params.user;
    const TargetUserId = userId === "3" ? 1 : 3;

    useEffect(() => {
        // Emit 'joinChat' when component mounts
        socket.emit('joinChat', { userId, TargetUserId });

        // Listen for join success or error
        socket.on('joinSuccess', (roomId) => {
            console.log(`Successfully joined room: ${roomId}`);
        });

        socket.on('joinError', (error) => {
            console.error('Error joining room:', error);
        });

        // Listen for received messages
        socket.on("messageReceived", ({ message }) => {
            setMessages((prevMessages) => [...prevMessages, message]);
            console.log(message)
        });

        // Cleanup on component unmount
        return () => {
            socket.off("messageReceived");
        };
    }, [userId, TargetUserId]); // Runs when userId or TargetUserId changes

    const sendMessage = () => {
        if (newMessage.trim() === "") return;

        // Emit sendMessage event
        socket.emit("sendMessage", { userId, TargetUserId, message: newMessage });
        setNewMessage(""); // Clear the input field
    };

    console.log(messages); // Debug messages state

    return (
        <div className="flex flex-col h-screen p-4 bg-gray-100">
            <div className="flex-grow overflow-auto bg-white shadow-lg rounded-lg p-4 mb-4">
                <div id="chat-window">
                    {messages.map((message, index) => (
                        <div key={index} className="mb-2">
                            <span className="font-bold">Message:</span> {message}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex">
                <input
                    type="text"
                    className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
