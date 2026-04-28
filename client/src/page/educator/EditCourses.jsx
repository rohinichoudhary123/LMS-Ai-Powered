import React from "react";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router";

const EditCourses = () => {
  let navigate = useNavigate();
  const [isPublished, setIsPublished] = useState(true);
  console.log("click" , isPublished);
  
  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      {/* Top Bar */}
      <div className=" flex items-center justify-center  gap-[20px] md:justify-between flex-col md:flex-row mb-6 relative">
        <FaArrowLeftLong
          onClick={() => navigate("/courses")}
          className="top-[-20%] md:top-[20%] absolute left-0 md:left-[2%] w-6 h-7 cursor-pointer"
        />
        <h1 className="text-2xl font-semibold md:pl-[60px]">
          Add details information regarding course
        </h1>
        <div>
          <button className="text-white bg-black px-2 py-2.5 rounded-md">
            Go to lectures page
          </button>
        </div>
      </div>

      {/* Form Details */}
      <div className="bg-gray-100 p-6 rounded-md">
        <h2>Basic Courses information</h2>
        <div className=" space-y-2 space-x-2">
          {!isPublished ? (
            <button onClick={()=> setIsPublished(prev => !prev)} className="text-green-500 bg-green-100 border-2 px-2 py-1.5 border-gray-200 rounded-md cursor-pointer ">
              Click to Publish
            </button>
          ) : (
            <button  onClick={()=> setIsPublished(prev => !prev)} className="text-red-500 bg-red-100 border-2 px-2 py-1.5 border-gray-200 rounded-md cursor-pointer ">
              Click to UnPublish
            </button>
          )}
          <button className="text-white bg-red-600 rounded-md  px-2 py-1.5 cursor-pointer">
            {" "}
            Remove Courses
          </button>
        </div>
        <form className="space-y-6 ">
          <div>
            <label className="block text-sm  font-medium text-gray-700 my-2" htmlFor="title">Title</label>
            <input  className="w-full border px-4 py-2 rounded-md" type="text" id="title" placeholder="Courses Title" />
          </div>
           <div>
            <label className="block text-sm  font-medium text-gray-700 my-2" htmlFor="Subtitle">SubTitle</label>
            <input  className="w-full border px-4 py-2 rounded-md" type="text" id="Subtitle" placeholder="SubTitle" />
          </div>
           <div>
            <label className="block text-sm  font-medium text-gray-700 mb-1" htmlFor="Disc">Descriptions</label>
            <textarea  className="w-full resize-none border px-4 py-2 rounded-md" type="text" id="Disc" placeholder="Courses Descriptions" ></textarea>
          </div>

          <div>
            {/* category box */}
            <div>
              <label htmlFor=""></label>
              <input type="text" />
            </div>
             {/* Lever box */}
            <div className="">
               <label htmlFor=""></label>
               <section>
                <option value=""></option>
               </section>
            </div>
             {/* Price Box */}
            <div>
               <label htmlFor=""></label>
              <input type="text" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourses;
