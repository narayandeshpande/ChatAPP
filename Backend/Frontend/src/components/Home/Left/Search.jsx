import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from '../../../context/useGetAllUsers.jsx';
import useConversation from '../../../zustand/useConversation.js';
import toast from 'react-hot-toast'
const Search = () => {
        const [search,setSearch]=useState("")
        const [allUsers]=useGetAllUsers()
        const {setSelectedConversation}=useConversation()
        const handelSubmit=(e)=>{
                e.preventDefault();
                const conversation=allUsers.find((user)=>
                        user.fullname.toLowerCase().includes(search.toLowerCase()))
                if(conversation)
                {
                        setSelectedConversation(conversation)
                        setSearch("")
                }
                else{
                        toast.error("User not found")
                        // alert("User not found")
                        setSearch("")
                }
        }
        return (
                <div className=' h-[10vh] px-4 py-6'>
                        <form onSubmit={handelSubmit} >
                                <div className='flex gap-2'>
                                        <label className="input input-bordered flex items-center gap-2 w-[80%]">
                                                <input type="text" className="grow" placeholder="Search" 
                                                value={search}
                                                onChange={(e)=>{setSearch(e.target.value)}}
                                                />
                                        </label>
                                        <button>
                                                <FaSearch  className='text-5xl p-2 hover:bg-gray-600 rounded-full duration-300'/>
                                        </button>
                                </div>

                        </form>
                </div>
        )
}

export default Search
