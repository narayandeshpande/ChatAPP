import React, { useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";
const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const sendMessages = async (message) => {
    setLoading(true);
    try {
const res=await axios.post(`https://chatapp-bnvo.onrender.com${selectedConversation._id}`,{message},{
        withCredentials:true
      })
      setMessages([...messages, res.data.newMessage]);
      setLoading(false);
    } catch (error) {
      console.log("Error in send messages", error);
      setLoading(false);
    }
  };
  return { loading, sendMessages };
};

export default useSendMessage;