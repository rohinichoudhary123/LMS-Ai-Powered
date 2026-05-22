import React from "react";
import { Routes, Route, Navigate } from "react-router";
import Home from "./page/Home";
import Login from "./page/Login";
import SingUp from "./page/SingUp";
import { ToastContainer } from "react-toastify";
import useCurrentUser from "./customeHook/useCurrentUser";
import { useSelector } from "react-redux";
import Profile from "./page/Profile";
import ForgetPass from "./page/ForgetPass";
import EditPage from "./page/EditPage";
import Dashboard from "./page/educator/Dashboard";
import Courses from "./page/educator/Courses";
import CreateCourses from "./page/educator/CreateCourses"
import useGetCreateCourses from "./customeHook/useGetCreateCourses";
import EditCourses from "./page/educator/EditCourses";
import useGetPublished from "./customeHook/useGetPublished";
import AllCourses from "./page/AllCourses";

const App = () => {
   useCurrentUser()
   useGetCreateCourses()
   useGetPublished()
  const {userData} = useSelector(state =>state.user)
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singUp" element={ !userData ? <SingUp /> : <Navigate to={"/"}/>}  />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={ userData ?<Profile/> : <Navigate to={"/SingUp"}/>}/>
        {/* <Route path="/forget"  element = {userData ? <ForgetPass/> : <Navigate to={"/SingUp"}/>}/> */}
        <Route path="/forget" element={<ForgetPass/>}/>
        <Route path="/editProfile" element={ userData ?<EditPage/> : <Navigate to={"/SingUp"}/>}/>
           <Route path="/allCourses" element={ userData ?<AllCourses/> : <Navigate to={"/SingUp"}/>}/>
        <Route path="/dashBoard"   element={userData?.role === "Educator" ? <Dashboard/> : <Navigate to={"/singUp"} /> } />
        <Route path="/courses" element={ userData ?<Courses/> : <Navigate to={"/singUp"}/>} />
        <Route path="/createCourses"   element={userData?.role === "Educator" ? <CreateCourses/>: <Navigate to={"/singUp"} /> } />
        <Route path='/editCourses/:courseId' element={userData?.role ==="Educator" ? <EditCourses/>:<Navigate to={"/singUp"}/>} />
      </Routes>
    </>
  );
};

export default App;
