import React, { createContext, useContext, useState } from 'react'
import cookies from 'js-cookie'

export const AuthContext=createContext()

export const Authprovider = ({children}) => {
  const initialUserState=cookies.get("jwt") || localStorage.getItem("ChatAPP")
  //parse the user data and store in state
  const [authuser,setAuthuser]=useState(initialUserState? JSON.parse(initialUserState):undefined)
  
  return (
<AuthContext.Provider value={[authuser,setAuthuser]}>
  {children}
</AuthContext.Provider>
  )
}

export const useAuth=()=>useContext(AuthContext)
