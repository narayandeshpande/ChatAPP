import React from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { BiLogOutCircle } from "react-icons/bi";
const Logout = () => {
        // const [loading,setLoading]=(false)
        const logout = async () => {
                try {
                    const res = await axios.get("https://chatapp-bnvo.onrender.com", { withCredentials: true });
                    console.log(res);
            
                    if (res.status === 200) {
                        localStorage.removeItem("ChatAPP")
                        toast.success(res.data.message)
                        // alert(res.data.message);
                        window.location.reload()
                    }
                } catch (error) {
                        console.error("Logout request failed:", error);
                        //     alert("Failed to logout. Please try again.");
                        toast.error("Failed to logout. Please try again.")
                }
            };
            
        return (
                <div className=''>
                        <button onClick={logout}>
                                <BiLogOutCircle className='text-5xl ml-1 hover:bg-slate-700 duration-300 rounded-full'  />
                        </button>
                </div>
        )
}

export default Logout
