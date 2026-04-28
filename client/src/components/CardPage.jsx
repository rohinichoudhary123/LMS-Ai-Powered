import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cart from "./Cart";

const CardPage = () => {
  let { courseData } = useSelector((state) => state.course);
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    setPopularCourses(courseData ? courseData.slice(0, 6) : []);
  }, [courseData]);
  return (
    <div className="relative flex items-center justify-center flex-col">
      <h1 className="md:text-[45px] text-[30px] font-semibold text-center mt-[30px] px-[20px]">
        Our Popular Courses
      </h1>
      <span className="lg:w-[50%] md:w-[80%] text-[15px] text-center my-[30px] px-[20px] ">
        Explore top-rated course designed to boost your Skill , enhance careers
        , and unlock opportunities in tech , AI , business nad beyond.
      </span>

      <div className="w-[100%] min-h-[100vh]  flex items-center  justify-center flex-wrap gap-[50px] lf:p-[50px] md:p-[30px] p-[10px] mb-[40px]">
        {popularCourses?.map((course, index) => {
          return (
            <Cart
              key={course._id}
              thumbnail={course.thumbnail}
              title={course.title}
              category={course.category}
              price={course.price}
              id={course._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CardPage;
