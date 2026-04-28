import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";

const Dashboard = () => {
  let { userData } = useSelector((state) => state.user);

  let navigate = useNavigate()
  return (
    <div className="flex min-h-screen bg-gray-100">
      <FaArrowLeftLong className="w-[22px] absolute  top-[8%] left-[8%] h-[22px] cursor-pointer" onClick={()=>navigate("/")}/>
      <div className="w-full px-6 py-10 bg-gray-50 space-y-10">
        {/* main section */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md  p-6 flex flex-col md:flex-row items-center gap-6">
          {userData?.photoUrl ? (
            <img
              className="h-28 w-28 rounded-full object-cover border-4 border-black shadow-md"
              src={userData.photoUrl}
              alt="profile"
            />
          ) : (
            <div className="h-28 w-28 rounded-full flex items-center justify-center text-3xl font-bold bg-black text-white border-4 border-gray-300 shadow-md">
              {userData?.name?.slice(0, 1).toUpperCase()}
            </div>
          )}

          <div className="text-center md:text-left space-y-1 ">
            <h1 className="text-2xl font-semibold">Welcome , {userData?.name || "Educator"}👋</h1>
            <h2 className="text-lg font-semibold">Total Earning: 0</h2>
            <p className="text-gray-600 text-sm ">{userData?.description || 'Start Creating Courses For Your Student'}</p>
            <button onClick={()=>navigate("/courses")} className="px-11 py-2  mt-2 font-light text-white bg-black rounded-md cursor-pointer">Create Courses</button>
          </div>
        </div>

        {/* Graph section */}
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;
