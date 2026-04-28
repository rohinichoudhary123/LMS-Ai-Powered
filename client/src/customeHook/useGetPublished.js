import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCoursesData } from '../redux/courseSlice'

const useGetPublished = () => {
   let dispatch = useDispatch()
    useEffect(()=> {
        const getCourseData =  async () =>{
            try {
              let res = await axios.get("http://localhost:3000/api/courses/getPublishedCourses" , {withCredentials:true})
               dispatch(setCoursesData(res.data))
               console.log(res.data);
               
            } catch (error) {
                console.log(error);
                
            }
        }

        getCourseData()
    } ,[])
}

export default useGetPublished