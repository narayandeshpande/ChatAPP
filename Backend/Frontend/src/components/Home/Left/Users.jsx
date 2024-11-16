import React from 'react'
import User from './User'
import useGetAllUsers from '../../../context/useGetAllUsers'
const Users = () => {
  const [allUsers, loading] = useGetAllUsers()
  // console.log(allUsers);

  return (
    <div className=''>
      <h1 className=' bg-slate-800 text-md p-3 rounded-lg' >Messages</h1>
      <div className="flex-1 overflow-y-auto" style={{ maxHeight: "calc(84vh - 10vh)" }}>
        {
          allUsers.map((user,index)=>(
            <User user={user} key={index}/>
          ))
        }
        
      </div>
    </div>
  )
}

export default Users
