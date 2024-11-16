import React from 'react'

const Message = ({message}) => {
  // console.log(message);
  const authUser=JSON.parse(localStorage.getItem("ChatAPP"))
  const itMe=message.senderId===authUser.user.id;
  const chatName=itMe?"chat-end":"chat-start"
  const chatColor=itMe?"bg-blue-500":"";
  const createdAt=new Date(message.createdAt)
  const formatingTime=createdAt.toLocaleTimeString([],{
    hour:'2-digit',
    minute:'2-digit'
  })
  return (
    <div className='p-4'>
      <div className={`chat ${chatName}`}>
  <div className={`chat-bubble text-white ${chatColor}`}>{message.message}</div>
  <br />
  <div>{formatingTime}</div>
</div>
    </div>
  )
}

export default Message
