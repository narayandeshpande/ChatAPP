import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import useSendMessage from '../../../context/useSendMessage.jsx';
const Typesend = () => {
  const {loading,sendMessages}=useSendMessage()
  const [message,setMessage]=useState("")
const handelSubmit=async(e)=>{
  e.preventDefault()
 await sendMessages(message)
 setMessage("")
  
}
  return (
<form onSubmit={handelSubmit}>
<div className='h-[8vh] bg-slate-800 text-center p-1'>
        <div className="w-[70%] flex">
        <input type="text" placeholder="Type here" className="input input-bordered w-full" value={message} onChange={(e)=>setMessage(e.target.value)}/>
        <button>
        <IoSend className='text-3xl'/>
        </button>
        </div>
    </div>
</form>
  )
}

export default Typesend
