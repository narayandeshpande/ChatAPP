import React from 'react'
import useConversation from '../../../zustand/useConversation.js'
import { useSocketContext } from '../../../context/SocketContaxt.jsx';
import { CiMenuFries } from "react-icons/ci";

const Chatuser = () => {
  const user=JSON.parse(localStorage.getItem("ChatAPP"))
  const {selectedConversation}=useConversation();
  const {onlineUsers}=useSocketContext()
  const getOnlineUserStatus=(userId)=>{
    return onlineUsers.includes(userId)?"Online":"Offline"
  }
  return (
      <>
    <div className="relative flex items-center h-[8%] justify-center gap-4 bg-slate-800 hover:bg-slate-700 duration-300 rounded-md">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5"
        >
        <CiMenuFries className="text-white text-xl" />
      </label>
    <div className='h-[8vh]'>
        <div className="flex justify-center items-end hover:bg-slate-500 gap-3 ">
        <div className="avatar online">
  <div className="w-14 rounded-full ">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  </div>
</div>
<div className='text-white'>
        <h1 className='text-xl'>{selectedConversation?selectedConversation.fullname:user.user.fullname}</h1>
        <span className='text-sm'>{getOnlineUserStatus(selectedConversation._id)}</span>
</div>
    </div>
        </div>
          </div>
          </>
  )
}

export default Chatuser
