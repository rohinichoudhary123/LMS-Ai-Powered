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

const App = () => {
   useCurrentUser()
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
      </Routes>
    </>
  );
};

export default App;
