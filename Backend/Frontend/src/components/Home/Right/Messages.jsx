import React, { useEffect, useRef } from 'react'
import Message from '../Right/Message.jsx'
import Loading from '../../../components/Loading.jsx'
import useGetMessages from '../../../context/useGetMessages.jsx'
import useGetsocketMessage from '../../../context/useGetsocketMessage.jsx'
const Messages = () => {
  const {loading,messages}=useGetMessages()
  useGetsocketMessage()
const lastmsgRef=useRef()
useEffect(()=>{
  setTimeout(() => {
    if(lastmsgRef.current)
    {
      lastmsgRef.current.scrollIntoView({
        behavior:"smooth"
      })
    }
  }, 100);
},[messages])
  return (
    <div style={{minHeight:"calc(92vh - 8vh)"}}>
    {
      loading?(<Loading/>):(messages.length>0 && messages.map((message,index)=>(
        <div key={index} ref={lastmsgRef}>
          <Message  message={message} />
        </div>
      )))
    }
    {
      !loading && messages.length===0 && (
        <div>
          <p className='text-center mt-[20%]'>
            Say! Hi to start the conversation
          </p>
        </div>
      )
    }
    </div>
  )
}

export default Messages
