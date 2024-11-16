import React, { useEffect } from 'react'
import { useSocketContext } from './SocketContaxt.jsx'
import useConversation from '../zustand/useConversation.js'
import sount from '../assets/notification.mp3'
const useGetsocketMessage = () => {
        const {socket}=useSocketContext()
        const {messages,setMessages}=useConversation()
        useEffect(()=>{
                socket.on("newMessage",(newMessage)=>{
                        const notification=new Audio(sount)
                        setMessages([...messages,newMessage])
                        notification.play()
                });
                return ()=>{
                        socket.off("newMessage")
                };
        },[socket,messages,setMessages])
}
export default useGetsocketMessage
