import express from "express"
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'
import cors from 'cors'
import cookieparser from 'cookie-parser'
import userRoute from './Routes/User.route.js'
import messageRouter from './Routes/Message.route.js'
import { app, server } from "./SocketIo/server.js"

app.use(express.json());
app.use(cookieparser())
app.use(cors(
        {
                origin:*,
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

app.get("/printmsg",(req,res,next)=>{
        console.log("Hello test1")
        return res.send(200).json({
                message: "Hello test"
        })
})
app.use("/user",userRoute)
app.use('/message',messageRouter)
// --------------------------------------------
if(process.env.NODE_ENV==="production")
{
        const dirPath=path.resolve()
        app.use(express.static("./Frontend/dist"));
        app.get("*",(req,res)=>{
                res.sendFile(path.resolve(dirPath,"./Frontend/dist","index.html"));
                
        })
}
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
