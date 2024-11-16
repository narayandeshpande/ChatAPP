import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
const useGetAllUsers = () => {
        const [allUsers, setAllusers] = useState([])
        const [loading, setLoading] = useState(false)
        useEffect(() => {
                const getAllusers = async () => {
                        setLoading(true)
                        try {
                                const token = Cookies.get("jwt")
                               const responce= await axios.get("https://chatapp-bnvo.onrender.com", {
                                withCredentials: true
                              })
                                setAllusers(responce.data)
                                setLoading(false)
                                      
                        } catch (error) {
                                console.log(error);
                        }
                }
                getAllusers()
        }, [])
        return[allUsers,loading]
}

export default useGetAllUsers
