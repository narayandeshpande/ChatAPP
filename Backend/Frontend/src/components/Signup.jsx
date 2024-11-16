import React from 'react'
import axios from "axios"
import { useForm } from "react-hook-form"
import { useAuth } from '../context/Authprovider.jsx'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
const Signup = () => {
  const [authuser,setAuthuser]=useAuth()
        const {
                register,
                handleSubmit,
                watch,
                formState: { errors },
              } = useForm()
            
        //       watch the Password and confirmPassword
              const Password=watch("Password","")
              const ConfirmPassword=watch("ConfirmPassword","")
              const validatePasswordMatch=(value)=>{
               return  value===Password || "Password do not match"
              }
              const onSubmit = async(data) =>{
                const userInfo={
                        fullname:data.FullName,
                        email:data.Email,
                        password:data.Password,
                        confirmPassword:ConfirmPassword
                }
                //console.log(userInfo);
               await axios.post("http://localhost:3000/user/signup",userInfo,{
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
          <h1 className="text-xl text-white m-1">Signup</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full justify-center items-center" >
            <input type="text" name="fname" id="fname" placeholder="FullName" className="border border-white rounded-sm p-2 md:w-[50%] w-[90%]" 
            {...register("FullName", { required: true })}
            />
            {errors.FullName && <span className='text-red-600 text-sm'>This field is required</span>}
            <input type="email" name="email" id="email" placeholder="Email" className="border border-white rounded-sm p-2 md:w-[50%] w-[90%]" 
            {...register("Email", { required: true })}
            />
            {errors.Email && <span className='text-red-600 text-sm'>This field is required</span>}
            <input type="password" name="pass" id="pass" placeholder="Password" className="border border-white rounded-sm p-2 md:w-[50%] w-[90%]" 
            {...register("Password", { required: true })}
            />
            {errors.Password && <span className='text-red-600 text-sm'>This field is required</span>}
            <input type="password" name="cpass" id="cpass" placeholder="Confirm Password" className="border border-white rounded-sm p-2 md:w-[50%] w-[90%]" 
            {...register("ConfirmPassword", { required: true, validate:validatePasswordMatch })}
            />
            {errors.ConfirmPassword && <span className='text-red-600 text-sm'>
                { errors.ConfirmPassword.message}
                </span>}
            <p>Have an account? <Link to={'/login'} href="" className="text-blue-700 underline">Login</Link></p>
            <input type="submit" value="Signup" className="bg-green-800 text-white rounded-full mb-2 hover:bg-green-600 md:w-[30%] p-2 w-[40%]"/>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
