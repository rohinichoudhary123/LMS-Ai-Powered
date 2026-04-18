import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { IoPersonCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { setUserData } from "../redux/UserSlice";
import { toast } from "react-toastify";
import { MdOutlineMenu } from "react-icons/md";
import { GiSplitCross } from "react-icons/gi";
const NavBar = () => {
  const { userData } = useSelector((state) => state.user);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showHam, setShowHam] = useState(false);

  const handelLogout = async () => {
    try {
      let res = await axios.get("http://localhost:3000/api/auth/logout", {
        withCredentials: true,
      });

      console.log(res.data);
      dispatch(setUserData(null));
      toast.success("User Logout SuccessFully");
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(setUserData(error.response.data.message));
    }
  };
  return (
    <div>
      <div className="w-[100%] h-[70px]  fixed top-0 px-[20px] py-[10px]  flex justify-between items-center bg-[#00000047]  z-10">
        <div className="lg:w-[20%] w-[40%]  lg:pl-[50px]">
          <img
            className="w-[60px] rounded-[5px] border-2 border-white cursor-pointer"
            src={logo}
            alt=""
          />
        </div>
        <div className="w-[30%] lg:flex items-center justify-center gap-4 hidden">
          {!userData && (
            <IoPersonCircle
              onClick={() => setShow((prev) => !prev)}
              className="w-[50px] h-[50px] fill-black cursor-pointer"
            />
          )}
          {userData && (
            <div
              onClick={() => setShow((prev) => !prev)}
              className="w-[50px]  h-[50px] rounded-full text-white flex  items-center  justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
            >
              {userData?.name ? userData.name.slice(0, 1).toUpperCase() : "?"}
            </div>
          )}
          {userData?.role === "Educator" && (
            <div className="px-[20px] py-[10px] border-2 border-white text-white bg-[black] rounded-[10px] text-[18px] font-light cursor-pointer">
              Dashboard
            </div>
          )}
          {!userData ? (
            <span
              onClick={() => navigate("/login")}
              className="px-[20px] py-[10px] border-2 border-white text-white bg-[black] rounded-[10px] text-[18px] font-light cursor-pointer"
            >
              Login
            </span>
          ) : (
            <span
              onClick={handelLogout}
              className="px-[20px] py-[10px] bg-white text-black rounded-[10px] shadow-sm shadow-black text-[18px] cursor-pointer"
            >
              Logout
            </span>
          )}
          {show && (
            <div className=" absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-white px-[15px] py-[10px] border-2 border-black  hover:border-white hover:text-white cursor-pointer hover:bg-black">
              <span onClick={() => navigate("/profile")} className=" bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600">
                My Profile
              </span>
              <span className=" bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600">
                My Courses
              </span>
            </div>
          )}
        </div>
        <MdOutlineMenu
          onClick={() => setShowHam((prev) => !prev)}
          className="w-[35px] h-[35px] lg:hidden  fill-black cursor-pointer"
        />

        {/* <div
          className={`fixed top-0 left-0 w-[100vw] h-[100vh]  bg-[#000000d6] items-center justify-center flex-col gap-10 z-10 lg:hidden ${showHam ? "translate-x-[0] transition  duration-600" : "translate-x-[-100%] transition  duration-600"}`}
        >
          <GiSplitCross
            onClick={() => setShowHam((prev) => !prev)}
            className="w-[30px] h-[30px] rounded-full bg-black  fill-white absolute top-5 right-[5%] "
          />
            {!userData && (
            <IoPersonCircle
              className="w-[50px] h-[50px] fill-black cursor-pointer"
            />
          )}
          {userData && (
            <div
              className="w-[50px]  h-[50px] rounded-full text-white flex  items-center  gap-2 justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
            >
              {userData?.name ? userData.name.slice(0, 1).toUpperCase() : "?"}
            </div>
          )}
          {userData?.role === "Educator" && (
            <div className="  w-[200px] h-[40px] border-2 border-white text-white bg-[black] rounded-[10px] text-[18px] font-light cursor-pointer">
              My Profile
            </div>
          )}
          {userData?.role === "Educator" && (
            <div className="w-[200px]  h-[40px] border-2 border-white text-white bg-[black] rounded-[10px] text-[18px] font-light cursor-pointer">
              Dashboard
            </div>
          )}
        </div> */}
        <div
  className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#000000d6] flex flex-col items-center justify-center gap-10 z-10 lg:hidden transform transition-transform duration-500 ease-in-out ${
    showHam ? "translate-x-0" : "-translate-x-full"
  }`}
>
  {/* Close Button */}
  <GiSplitCross
    onClick={() => setShowHam((prev) => !prev)}
    className="w-[30px] h-[30px] rounded-full bg-black fill-white absolute top-5 right-[5%] cursor-pointer"
  />

  {/* User Icon */}
  {!userData && (
    <IoPersonCircle className="w-[50px] h-[50px] fill-white cursor-pointer" />
  )}

  {userData && (
    <div className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer">
      {userData?.name ? userData.name.slice(0, 1).toUpperCase() : "?"}
    </div>
  )}

  {/* Educator Options */}
  {userData?.role === "Educator" && (
    <>
      <div onClick={() => navigate("/profile")} className="w-[200px] h-[40px] flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] cursor-pointer">
        My Profile
      </div>
      <div className="w-[200px] h-[40px] flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] cursor-pointer">
        My Courses
      </div>

      <div className="w-[200px] h-[40px] flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] cursor-pointer">
        Dashboard
      </div>
    </>
  )}
   {!userData ? (
            <span
              onClick={() => navigate("/login")}
              className="w-[200px] h-[40px] flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] cursor-pointer"
            >
              Login
            </span>
          ) : (
            <span
              onClick={handelLogout}
              className="w-[200px] h-[40px] flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] cursor-pointer"
            >
              Logout
            </span>
          )}
</div>
      </div>
    </div>
  );
};

export default NavBar;
