import React from 'react'
import Search from './Search.jsx'
import Users from './Users.jsx'
import Logout from './Logout.jsx'

const Left = () => {
  return (
    <div className='w-full  bg-black text-white'>
      <Search/>
      <div className=" flex-1 overflow-y-auto" style={{minHeight:"calc(92vh - 8vh)"}}>
     <Users/>
     </div>
      
      <Logout/>
    </div>
  )
}

export default Left
