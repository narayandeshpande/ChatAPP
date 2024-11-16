import { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './Authprovider.jsx';
import io from 'socket.io-client';
export const SocketContext = createContext();
export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [authUser] = useAuth();
    const [onlineUsers, setOnlineUsers] = useState([])

    useEffect(() => {
        if (authUser) {
            const newSocket = io("https://chatapp-bnvo.onrender.com", {
                query: {
                    userId: authUser.user.id,
                },
            });
            console.log(authUser.user.id);

            setSocket(newSocket);
            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users)
            })
            return () => newSocket.close()
        }
        else {
            if (socket) {
                socket.close()
                setSocket(null)
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
