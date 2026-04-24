import React from "react";
import { useSelector } from "react-redux";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router";
import axios from "axios";
const Profile = () => {
  let { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center">
      <div className=" bg-white shadow-lg rounded-2xl px-6 py-3 max-w-xl w-full relative ">
        <FaArrowLeftLong onClick={() => navigate("/")} className="text-xl" />

        <div className=" flex flex-col text-center items-center">
          {userData?.photoUrl ? (
            <img
              className="w-24 h-24 rounded-full object-cover border-4 border-black"
              src={userData?.photoUrl}
              alt=""
            />
          ) : (
            <div className=" h-24 w-24 rounded-full text-white  flex items-center justify-center text-[30px] border-2 bg-black  border-white">
              {userData?.name ? userData.name.slice(0, 1).toUpperCase() : "?"}
            </div>
          )}
          <h1 className="text-xl font-semibold mt-2 text-black">
            {userData?.name
              ? userData?.name?.charAt(0).toUpperCase() +
                userData?.name?.slice(1)
              : ""}
          </h1>
          <h2 className="text-sm font-light text-gray-600 ">
            {userData?.role}
          </h2>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex gap-1 text-lg items-center justify-start ">
            <span className="font-semibold text-gray-700">Email:</span>
            <h1>{userData?.email}</h1>
          </div>

          <div className="flex gap-1 text-lg items-center justify-start ">
            <span className="font-semibold text-gray-700">Bio:</span>
            <h1>{userData?.description}</h1>
          </div>

          <div className="flex gap-1 text-lg items-center justify-start ">
            <span className="font-semibold text-gray-700">  
              Enrolled Courses:
            </span>
            <h1>{userData?.enrolledCourse.length || 0}</h1>
          </div>
        </div>
        <div className=" flex flex-col items-center m-2 justify-center">
          <button
            onClick={() => navigate("/editProfile")}
            className="py-2.5 px-5 text-white bg-black rounded-xl text-lg   cursor-pointer"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
