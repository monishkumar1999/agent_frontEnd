import { io } from "socket.io-client";
import server from "../admin/assets/constant";

export const createSocketConnection = () => {
    // Checking if the server is using the specific path for socket.io
    if (server === "http://13.203.235.203:8000") {
        return io("http://13.203.235.203:8000", { path: "/socket.io" });
    }

    return io(server);  // For all other cases, just use the server URL directly
};
