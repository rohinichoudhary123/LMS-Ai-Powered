import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCreateCoursesData } from "../redux/courseSlice";

const useGetCreateCourses = () => {
  let dispatch = useDispatch();
  let { userData } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchCreateCourses = async () => {
      try {
        let res = await axios.get(
          "http://localhost:3000/api/courses/getCreate",
          {
            withCredentials: true,
          },
        );

        dispatch(setCreateCoursesData(res.data.data));
        console.log(res.data.data);
      } catch (error) {
        console.log(error);
        console.log(error.response.data.message);
      }
    };
    fetchCreateCourses();
  }, [userData]);
};

export default useGetCreateCourses;
