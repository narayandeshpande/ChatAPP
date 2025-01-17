import express from "express"
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieparser from 'cookie-parser'
import userRoute from './Routes/User.route.js'
import messageRouter from './Routes/Message.route.js'
import { app, server } from "./SocketIo/server.js"

app.use(express.json());
app.use(cookieparser())
app.use(cors(
        {
                origin: 'https://chatapp-narayan.netlify.app',
                credentials:true
        }
))
dotenv.config()
const port = process.env.PORT || 5000
const MONGOURL=process.env.MONGODBURL

try {
        mongoose.connect(MONGOURL)
        console.log("Connect to DB");
        
} catch (error) {
        console.log(error);           
}
app.use("/user",userRoute)
app.use('/message',messageRouter)

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
