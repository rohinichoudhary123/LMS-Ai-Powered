import React from "react";
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { LiaUikit } from "react-icons/lia";
import { MdOutlineAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { RiOpenaiFill } from "react-icons/ri";
import { SiGoogledataproc } from "react-icons/si";
import { BsClipboardDataFill } from "react-icons/bs";
import { SiOpenaigym } from "react-icons/si";

const ExploreCourses = () => {
  return (
    <div className="w-[100vw] min-h-[50vh] lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-[30px]">
      <div className="w-[100%] lg:w-[350px] lg:h-[100%] h-[400px] flex flex-col items-start justify-center gap-1 md:px-[40px] px-[20px]">
        <span className="text-[35px] font-semibold ">Explore</span>
        <span className="text-[35px] font-semibold ">Our Courses</span>
        <p className="text-[17px]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt eveniet
          accusantium eaque deleniti architecto minus iste assumenda ducimus?
        </p>
        <button className="px-5 py-2.5 border-2 cursor-pointer bg-black border-white text-white rounded-[10px] text-[18px] font-light flex gap-2 mt-8">
          Explore Courses
          <SiViaplay className=" w-[26px] h-[26px] lg:fill-white fill-black" />
        </button>
      </div>
      <div className="w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center lg:gap-[60px]  gap-[50px] flex-wrap mb-[50px] lg:mb:[0px]">
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-1 text-center">
          <div className="w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center">
           <TbDeviceDesktopAnalytics    className="h-[60px] w-[60px] text-[#6d6c6c]"/>
          </div>
          Web Dev
        </div>
         <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-1 text-center">
          <div className="w-[100px] h-[90px] bg-[#d9fbe0] rounded-lg flex items-center justify-center">
            <LiaUikit  className="h-[60px] w-[60px] text-[#6d6c6c]" />
          </div>
         UI/UX Designing
        </div>
         <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-1 text-center">
          <div className="w-[100px] h-[90px] bg-[#fcb9c8] rounded-lg flex items-center justify-center">
            <MdOutlineAppShortcut  className="h-[60px] w-[60px] text-[#6d6c6c]"/>
          </div>
          App Dev
        </div>
         <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-1 text-center">
          <div className="w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center">
            <FaHackerrank  className="h-[60px] w-[60px] text-[#6d6c6c]"/>
          </div>
          Ethical Hacking
        </div>
         <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-1 text-center">
          <div className="w-[100px] h-[90px] bg-[#d9fbe0] rounded-lg flex items-center justify-center">
            <RiOpenaiFill  className="h-[60px] w-[60px] text-[#6d6c6c]"/>
          </div>
           AI/ML
        </div>
         <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-1 text-center">
          <div className="w-[100px] h-[90px] bg-[#fcb9c8]  rounded-lg flex items-center justify-center">
            <SiGoogledataproc  className="h-[60px] w-[60px] text-[#6d6c6c]"/>
          </div>
          Data Sciences
        </div>
         <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-1 text-center">
          <div className="w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center">
            <BsClipboardDataFill className="h-[60px] w-[60px] text-[#6d6c6c]" />
          </div>
           Data Analytics
        </div>
         <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-1 text-center">
          <div className="w-[100px] h-[90px] bg-[#d9fbe0] rounded-lg flex items-center justify-center">
            <SiOpenaigym  className="h-[60px] w-[60px] text-[#6d6c6c]" />
          </div>
           Al Tools
        </div>
     
      </div>
    </div>
  );
};

export default ExploreCourses;
