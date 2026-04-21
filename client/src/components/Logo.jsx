import React from "react";
import { MdCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaSackDollar, FaUser } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
const Logo = () => {
  return (
    <div className=" w-[100vw] min-h-[90px] flex items-center justify-center flex-wrap gap-4 md:mb-[50px]  mt-3 ">
      <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]">
        <MdCastForEducation className="w-[35px] h-[35px] fill-[#03394b]" />
        20K+ online courses
      </div>
      <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]">
        <SiOpenaccess className="w-[35px] h-[35px] fill-[#03394b]" />
       Life Time Access
      </div>
      <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]">
        <FaSackDollar className="w-[35px] h-[35px] fill-[#03394b]" />
        value for money
      </div>
      <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]">
       <BiSupport className="w-[35px] h-[35px] fill-[#03394b]" />
        LifeTime Support
      </div>
      <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]">
        <FaUser className="w-[35px] h-[35px] fill-[#03394b]"/>
        Community Support
      </div>
    </div>
  );
};

export default Logo;
