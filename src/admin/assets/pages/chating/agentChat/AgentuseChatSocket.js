import { useEffect, useRef } from "react";
import { createSocketConnection } from "../../../../../utils/socket";

const useChatSocket = (userId, targetId, setMessages) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    if (!socketRef.current) {
      socketRef.current = createSocketConnection();
    }

    const socket = socketRef.current;

    console.log(`🔄 Connecting user ${userId} to chat with ${targetId}...`);

    socket.emit("leaveChat", { userId });
    socket.emit("joinChat", { userId, targetId });

    const handleMessageReceived = ({ sender, message, timestamp }) => {
      console.log(message);
      setMessages((prev) => [...prev, { sender, message, timestamp }]);
    };

    socket.on("joinSuccess", (roomId) => {
      console.log(`✅ Joined chat room: ${roomId}`);
    });

    socket.on("messageReceived", handleMessageReceived);

    socket.on("joinError", (error) => {
      console.error("❌ Error joining chat:", error);
    });

    return () => {
      console.log(`🚪 Leaving chat room for user ${userId}`);
      socket.emit("leaveChat", { userId });

      // Remove event listener to prevent duplicates
      socket.off("messageReceived", handleMessageReceived);
      socket.off("joinSuccess");
      socket.off("joinError");
    };
  }, [userId, targetId]); // Only re-run when userId or targetId changes

  return socketRef.current;
};

export default useChatSocket;
