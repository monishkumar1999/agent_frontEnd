import { io } from "socket.io-client";
import server from "../admin/assets/constant";



export const createSocketConnection=()=>{
    return io(server);
}