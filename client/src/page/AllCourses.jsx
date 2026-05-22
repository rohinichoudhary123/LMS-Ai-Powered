import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { FaArrowLeftLong } from "react-icons/fa6";
import { data, useNavigate } from "react-router";
import ai from "../assets/SearchAi.png";
import { useSelector } from "react-redux";
import Cart from "../components/Cart";
const AllCourses = () => {
  const navigate = useNavigate();
  const { courseData } = useSelector((state) => state.course);
  console.log(Array.isArray(courseData));
  console.log(courseData);

  const [category, setCategory] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((c) => c !== e.target.value));
      console.log("Category this True");
    } else {
      setCategory((prev) => [...prev, e.target.value]);
      console.log("Category is prev values");
    }
  };

  const applyFilter = () => {
    let coursesCopy = courseData?.data?.slice() || [];
    console.log(coursesCopy);

    if (category.length > 0) {
      coursesCopy = coursesCopy.filter((c) => category.includes(c.category));
    }
    setFilterCourses(coursesCopy);
  };

  useEffect(() => {
    setFilterCourses(courseData);
  }, [courseData]);

  useEffect(() => {
    applyFilter();
  }, [category]);

  return (
    <div className=" flex min-h-screen bg-gray-50">
      <NavBar />
      {/* SideBar */}
      <aside className="w-[260px] h-screen overflow-y-auto  bg-black fixed top-0 left-0 p-6 pt-[130px]  border-r border-gray-200 shadow-md transitions-transform duration-300 z-5">
        <h2 className="text-xl font-bold flex items-center justify-center gap-2 text-gray-50 mb-6 ">
          <FaArrowLeftLong
            onClick={() => navigate("/")}
            className="text-white"
          />{" "}
          Filter by Category
        </h2>

        <form className="space-y-4  text-sm bg-gray-600 border-white text-white border p-[20px] rounded-2xl">
          <button className="px-[10px] py-[10px] bg-black text-white rounded-[10px] text-[15px]   font-light flex  items-center justify-center gap-2 cursor-pointer">
            Search with AI{" "}
            <img className="h-[30px] w-[30px] rounded-full" src={ai} alt="" />
          </button>

          <label
            className="flex items-center  gap-3 cursor-pointer hover:text-gray-200 transition"
            htmlFor=""
          >
            <input
              type="checkbox"
              className=" accent-black w-4 h-4 rounded-md"
              onChange={toggleCategory}
              value={"App Development"}
            />{" "}
            App Development
          </label>
          <label
            className="flex items-center  gap-3 cursor-pointer hover:text-gray-200 transition"
            htmlFor=""
          >
            <input
              type="checkbox"
              className=" accent-black w-4 h-4 rounded-md"
              onChange={toggleCategory}
              value={" AI/ML"}
            />
            AI/ML
          </label>
          <label
            className="flex items-center  gap-3 cursor-pointer hover:text-gray-200 transition"
            htmlFor=""
          >
            <input
              type="checkbox"
              className=" accent-black w-4 h-4 rounded-md"
              onChange={toggleCategory}
              value={"AI Tools "}
            />
            AI Tools
          </label>
          <label
            className="flex items-center  gap-3 cursor-pointer hover:text-gray-200 transition"
            htmlFor=""
          >
            <input
              type="checkbox"
              className=" accent-black w-4 h-4 rounded-md"
              onChange={toggleCategory}
              value={"Data Science"}
            />{" "}
            Data Science
          </label>
          <label
            className="flex items-center  gap-3 cursor-pointer hover:text-gray-200 transition"
            htmlFor=""
          >
            <input
              type="checkbox"
              className=" accent-black w-4 h-4 rounded-md"
              onChange={toggleCategory}
              value={"Data Analytics"}
            />{" "}
            Data Analytics
          </label>
          <label
            className="flex items-center  gap-3 cursor-pointer hover:text-gray-200 transition"
            htmlFor=""
          >
            <input
              type="checkbox"
              className=" accent-black w-4 h-4 rounded-md"
              onChange={toggleCategory}
              value={"Ethical Hacking"}
            />{" "}
            Ethical Hacking
          </label>
          <label
            className="flex items-center  gap-3 cursor-pointer hover:text-gray-200 transition"
            htmlFor=""
          >
            <input
              type="checkbox"
              className=" accent-black w-4 h-4 rounded-md"
              onChange={toggleCategory}
              value={"Ui/Ux Designing"}
            />{" "}
            UI/Ux Designing
          </label>
          <label
            className="flex items-center  gap-3 cursor-pointer hover:text-gray-200 transition"
            htmlFor=""
          >
            <input
              type="checkbox"
              className=" accent-black w-4 h-4 rounded-md"
              onChange={toggleCategory}
              value={"Web Development"}
            />{" "}
            Web Development
          </label>
          <label
            className="flex items-center  gap-3 cursor-pointer hover:text-gray-200 transition"
            htmlFor=""
          >
            <input
              type="checkbox"
              className=" accent-black w-4 h-4 rounded-md"
              onChange={toggleCategory}
              value={"Others"}
            />{" "}
            Others
          </label>
        </form>
      </aside>

      <main className="w-full transition-all duration-300 py-[130px]  md:pl-[300px] flex items-start justify-center md:justify-start flex-wrap gap-6 px-[10px] ">
        {filterCourses.map(( course , index) => {
          return (
            <Cart
              key={index}
              thumbnail={course.thumbnail}
              title={course.title}
              category={course.category}
              price={course.price}
              id={course._id}
            />
          );
        })}
      </main>
    </div>
  );
};

export default AllCourses;
