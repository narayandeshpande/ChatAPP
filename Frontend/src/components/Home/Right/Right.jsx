import React, { useEffect } from 'react'
import Chatuser from './Chatuser'
import Messages from './Messages'
import Typesend from './Typesend'
import {useAuth} from '../../../context/Authprovider.jsx'
import useConversation from '../../../zustand/useConversation'
import { CiMenuFries } from "react-icons/ci";
const Right = () => {
  const {selectedConversation,setSelectedConversation}=useConversation()
  useEffect(()=>{
    return setSelectedConversation(null)
  },[setSelectedConversation])
  return (
      <div className='w-full  bg-slate-700'>
    <div className="">
      {
        !selectedConversation?(<NoChatSelected/>):(
          <>
          <Chatuser/>
         <div className=" flex-1 overflow-y-auto" style={{maxHeight:"calc(92vh - 8vh)"}}>
         <Messages/>
         </div>
          <Typesend/>
          </>
        )
      }
      </div>
    </div>
  )
}
export default Right

const NoChatSelected=()=>{
  const [authUser]=useAuth()
  return(
    <>
    <div className="relative">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-center">
          Welcome{" "}
          <span className="font-semibold text-xl">
            {authUser.user.fullname}
          </span>
          <br />
          No chat selected, please start conversation by selecting anyone to
          your contacts
        </h1>
      </div>
    </div>
  </>
  )
}