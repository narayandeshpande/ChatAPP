import React from 'react'
import { Toaster } from 'react-hot-toast';
import Left from './components/Home/Left/Left'
import Right from './components/Home/Right/Right'
import Signup from './components/Signup'
import Login from './components/Login'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../src/context/Authprovider'
const App = () => {
  const [authuser, setAuthuser] = useAuth()
  console.log(authuser);

  return (
 <>
    <Routes>
      <Route path='/' element={authuser ? (
      //   <div className='flex h-screen'>
      //   <Left />
      //   <Right />
      // </div>
      <div className="drawer lg:drawer-open">
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content flex flex-col items-center justify-center">
      <Right />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu w-80 min-h-full bg-black text-base-content">
        <Left />
        </ul>
      </div>
    </div>
    ) :
       (<Navigate to='/login'/>)} />

      <Route path='/login' element={authuser? <Navigate to='/'/>:<Login/>}/>
      <Route path='/signup' element={authuser?<Navigate to='/'/>:<Signup/>}/>

    </Routes>
    <Toaster />
 </>
  )
}

export default App
