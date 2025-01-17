import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import { log } from 'console';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
        cors: {
                origin: "https://chatapp-narayan.netlify.app",
                methods: ["GET", "POST"],
                // credentials: true
        }
});

export const getReceiverSocketId=(receiverId)=>{
        return users[receiverId]
}


const users = {}
// Listen for connections on the server side
io.on("connection", (socket) => {
        console.log("A user connected", socket.id);
        const userId = socket.handshake.query.userId;
        if (userId) {
                users[userId] = socket.id
                console.log("hello", users);
        }
        io.emit("getOnlineUsers",Object.keys(users))
        // Listen for the default disconnect event
        socket.on("disconnect", () => {
                console.log("A user disconnected", socket.id);
                delete users[userId];
                io.emit("getOnlineUsers",Object.keys(users))
        });
});

export { app, io, server };
