import React from 'react'
import { useForm } from "react-hook-form"
import axios  from 'axios'
import { useAuth } from '../context/Authprovider.jsx'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
const Login = () => {
  const [authuser,setAuthuser]=useAuth()
        const {
                register,
                handleSubmit,
                watch,
                formState: { errors },
              } = useForm()
            
              const onSubmit = async(data) => {
                const userInfo={
                        email:data.email,
                        password:data.password
                }
               await axios.post("https://chatapp-bnvo.onrender.com",userInfo,{
                withCredentials: true
              })
                .then((res)=>{
                    toast.success(res.data.message)
                        // alert(res.data.message)
                        localStorage.setItem("ChatAPP",JSON.stringify(res.data))
                        setAuthuser(res.data)
                        
                })
                .catch((errors)=>{
                  toast.error(errors.response.data.error)
                        // alert(errors.response.data.error)
                        
                })
                
              }
  return (
        <>
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
          <div className="flex justify-center items-center flex-col border border-white md:w-[50%] w-[70%] m-auto p-4">
            <h1 className="text-2xl">Chat <span className="text-green-500">APP</span></h1>
            <h1 className="text-xl text-white m-1">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full justify-center items-center" >
              <input type="email" name="email" id="email" placeholder="Email" className="border border-white rounded-sm p-1 md:w-[50%] w-[90%]" 
              {...register("email", { required: true })}
              />
              {errors.email && <span className='text-red-600 text-sm'>This field is required</span>}
              <input type="password" name="pass" id="pass" placeholder="Password" className="border border-white rounded-sm p-1 md:w-[50%] w-[90%]" 
              {...register("password", { required: true })}
              />
              {errors.password && <span className='text-red-600 text-sm'>This field is required</span>}
              <p>Create new Account ? <Link to={'/signup'} href="" className="text-blue-700 underline">Signup</Link></p>
              <input type="submit" value="Login" className="bg-green-800 text-white rounded-full mb-2 hover:bg-green-600 md:w-[30%] p-2 w-[40%]"/>
              </form>
          </div>
        </div>
      </>
  )
}

export default Login
