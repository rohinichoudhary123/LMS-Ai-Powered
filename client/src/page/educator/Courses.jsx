import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router";
import empty from "../../assets/empty.jpg";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useGetCreateCourses from "../../customeHook/useGetCreateCourses";

const Courses = () => {
  let navigate = useNavigate();
  let { createCoursesData } = useSelector((state) => state.course);
  useGetCreateCourses();
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 px-4 pt-3">
      <div className="w-[100%] min-h-screen p-4 sm:p-6 bg-gray-100">
        {/* Top NavBar */}
        <div className=" flex    flex-col sm:flex-row  items-start   justify-between sm:items-center mb-6 gap-3">
          <div className=" flex  gap-3 items-center justify-center">
            <FaArrowLeftLong
              className=" w-[22px] h-[22px] cursor-pointer"
              onClick={() => navigate("/dashboard")}
            />
            <h1 className=" text-2xl font-semibold "> All Create Courses</h1>
          </div>
          <button
            onClick={() => navigate("/createCourses")}
            className="text-white bg-black px-4 py-3 rounded hover:bg-gray-500  cursor-pointer"
          >
            Create Courses
          </button>
        </div>
        {/* for large Screen Table */}
        <div className="hidden md:block bg-white rounded-xl shadow  p-4 overflow-x-auto ">
          <table className="min-w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4">Courses</th>
                <th className="text-left py-3 px-4">Price </th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {createCoursesData?.map((courses, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition duration-200"
                  >
                    <td className=" py-3 px-4 flex items-center gap-4">
                      {courses.thumbnail ? (
                        <img
                          className="w-34 h-20 object-cover rounded-md object-fit"
                          src={courses.thumbnail}
                          alt=""
                        />
                      ) : (
                        <img
                          className="w-34 h-20 object-cover rounded-md object-fit"
                          src={empty}
                          alt=""
                        />
                      )}
                      <span>{courses.title}</span>
                    </td>
                    {courses?.price ? (
                      <td className="px-4 py-3">{courses.price}</td>
                    ) : (
                      <td className="px-4 py-3">₹ NA</td>
                    )}
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${courses.isPublished ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"} `}
                      >
                        {courses?.isPublished ? "Publish" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <FaEdit
                        onClick={() => navigate(`/editCourses/${courses._id}`)}
                        className=" h-6  text-center w-6 text-gary-600 hover:text-blue-600 cursor-pointer"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="text-center text-sm text-gray-400 mt-6">
            {" "}
            A list of your recent courses.
          </p>
        </div>

        {/* for Small screen Table */}

        <div className="md:hidden space-y-4">
          {createCoursesData.map((courses, index) => {
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-4 flex flex-col gap-3"
              >
                <div className="flex gap-4 items-center ">
                  {courses.thumbnail ? (
                    <img
                      className="w-16 h-16 object-cover rounded-md "
                      src={courses.thumbnail}
                      alt=""
                    />
                  ) : (
                    <img
                      className="w-16 h-16 object-cover rounded-md "
                      src={empty}
                      alt=""
                    />
                  )}

                  <div className="flex-1">
                    <h2 className="font-medium text-sm">{courses.title}</h2>
                    {courses?.price ? (
                      <p className="text-gray-600 text-xs mt-1">
                        {courses.price}
                      </p>
                    ) : (
                      <p className="text-gray-600 text-xs mt-1">₹ NA</p>
                    )}
                  </div>
                  <FaEdit
                    onClick={() => navigate(`/editCourses/${courses._id}`)}
                    className=" text-gary-600 hover:text-blue-600 cursor-pointer"
                  />
                </div>
                <span
                  className={`w-fit px-3 py-1 text-xs rounded-full ${courses.isPublished ? "text-green-600 bg-green-100" : "bg-red-100 text-red-600"}`}
                >
                  {courses.isPublished ? "Publish" : "Draft"}
                </span>
              </div>
            );
          })}
          <span className="block text-center text-sm text-gray-400 mt-2">
            A List of Your recent Courses.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Courses;
