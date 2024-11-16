import Conversation from '../Models/Converssation.model.js'
import Message from '../Models/Message.model.js'
import { getReceiverSocketId, io } from '../SocketIo/server.js'
export const sendMessage = async (req, res) => {
        try {
                const { message } = req.body
                // console.log(message);
                
                const { id: receiverId } = req.params
                const senderId = req.user._id
                let conversation = await Conversation.findOne({
                        members: { $all: [senderId, receiverId] }
                })
                if (!conversation) {
                        conversation = await Conversation.create({
                                members: [senderId, receiverId]
                        })
                }
                const newMessage = new Message({
                        senderId,
                        receiverId,
                        message
                })
                console.log(newMessage);
                
                if (newMessage) {
                        conversation.messages.push(newMessage._id)
                }
                await Promise.all([conversation.save(), newMessage.save()])
                const receiverSocketId=getReceiverSocketId(receiverId)
                if(receiverSocketId)
                {
                        io.to(receiverSocketId).emit("newMessage",newMessage)
                }
                res.status(201).json({
                        message: "Message send successfuly",
                        newMessage
                })

        } catch (error) {
                res.status(500).json({ error: "Internal server error" })
        }
}

export const getMessage=async(req,res)=>{
    try {
        const {id:chatUser}=req.params;
        const senderId=req.user._id;
        let conversation=await Conversation.findOne({
                members:{$all:[senderId,chatUser]},

        }).populate("messages")
        if(!conversation)
        {
                return res.status(201).json([])
        }
        const messages=conversation.messages
        // console.log(messages);
        
        res.status(201).json(messages)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
}