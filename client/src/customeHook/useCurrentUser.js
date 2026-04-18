
import React, { useEffect } from 'react'
import axios from "axios"
import { useDispatch } from "react-redux";
import { setUserData } from '../redux/UserSlice';

const useCurrentUser = () => {
      const dispatch = useDispatch()
   useEffect(() => {
        const fetchUser = async () =>{
            try {
                 let res = await axios.get("http://localhost:3000/api/user/get-user" , {
                    withCredentials:true
                 })

                //  console.log(res.data.data);
                 dispatch(setUserData(res.data.data))
                 
            } catch (error) {
                  console.log(error?.response?.data?.message);
                  dispatch(setUserData(null))
            }
        }
        fetchUser()
        // console.log(fetchUser())
    } ,[])
}

export default useCurrentUser