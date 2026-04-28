import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router";
import img from "../../assets/empty.jpg";
import { FaPen } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
const EditCourses = () => {
  let thumb = useRef();

  let { courseId } = useParams();
  console.log(courseId);

  let navigate = useNavigate();
  const [isPublished, setIsPublished] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  console.log(selectedCourse);

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [frontImage, setFrontImage] = useState(img);
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontImage(URL.createObjectURL(file));
  };

  const getCourseId = async () => {
    try {
      let res = await axios.get(
        `http://localhost:3000/api/courses/getCoursesId/${courseId}`,
        { withCredentials: true },
      );
      setSelectedCourse(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handelEditCourses = async () => {
    setLoading(true);
    let formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subTitle);
    formData.append("descriptions", descriptions);
    formData.append("category", category);
    formData.append("level", level);
    formData.append("price", price);
    formData.append("thumbnail", backendImage);
    formData.append("isPublished", isPublished);

    try {
      let res = await axios.post(
        `http://localhost:3000/api/courses/editCourses/${courseId}`,
        formData,
        { withCredentials: true },
      );
      console.log(res.data);
      setLoading(false);
      navigate("/courses");
      toast.success("Courses Update");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCourse) {
      setTitle(selectedCourse.title || "");
      setSubTitle(selectedCourse.subTitle || "");
      setDescriptions(selectedCourse.descriptions || "");
      setCategory(selectedCourse.category || "");
      setLevel(selectedCourse.level || "");
      setPrice(selectedCourse.price || "");
      setFrontImage(selectedCourse.thumbnail || img);
      setIsPublished(selectedCourse?.isPublished);
    }
  }, [selectedCourse]);
  useEffect(() => {
    getCourseId();
  }, []);

  const handelDelete = async () => {
    setDeleteLoading(true);
    console.log("click");
    
    try {
      let res = await axios.delete(
        `http://localhost:3000/api/courses/remove/${courseId}`,
        {
          withCredentials: true,
        },
      );

      console.log(res.data);
      setDeleteLoading(false);
      navigate("/courses");
      toast.success("Course Removed");
    } catch (error) {
      console.log(error);
      setDeleteLoading(false);
      toast.error(error.response.data.message);
     
    }
  };

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
      <div className="bg-gray-50 p-6 rounded-md">
        <h2>Basic Courses information</h2>
        <div className=" space-y-2 space-x-2">
          {!isPublished ? (
            <button
              onClick={() => setIsPublished((prev) => !prev)}
              className="text-green-500 bg-green-100 border-2 px-2 py-1.5 border-gray-200 rounded-md cursor-pointer "
            >
              Click to Publish
            </button>
          ) : (
            <button
              onClick={() => setIsPublished((prev) => !prev)}
              className="text-red-500 bg-red-100 border-2 px-2 py-1.5 border-gray-200 rounded-md cursor-pointer "
            >
              Click to UnPublish
            </button>
          )}
          <button onClick={handelDelete} className="text-white bg-red-600 rounded-md  px-2 py-1.5 cursor-pointer">
            Remove Courses
          </button>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6 ">
          <div>
            <label
              className="block text-sm  font-medium text-gray-700 my-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="w-full border px-4 py-2 rounded-md"
              type="text"
              id="title"
              placeholder="Courses Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div>
            <label
              className="block text-sm  font-medium text-gray-700 my-2"
              htmlFor="Subtitle"
            >
              SubTitle
            </label>
            <input
              className="w-full border px-4 py-2 rounded-md"
              type="text"
              id="Subtitle"
              placeholder="SubTitle"
              onChange={(e) => setSubTitle(e.target.value)}
              value={subTitle}
            />
          </div>
          <div>
            <label
              className="block text-sm  font-medium text-gray-700 mb-1"
              htmlFor="Disc"
            >
              Descriptions
            </label>
            <textarea
              className="w-full resize-none border px-4 py-2 rounded-md"
              type="text"
              id="Disc"
              placeholder="Courses Descriptions"
              onChange={(e) => setDescriptions(e.target.value)}
              value={descriptions}
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            {/* category box */}
            <div className="flex-1">
              <label
                className="block text-sm font-medium text-gray-700 mt-1"
                htmlFor=""
              >
                {" "}
                Course Category
              </label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="w-full border px-4 py-2  rounded-md bg-white"
              >
                <option value="">Select Category</option>
                <option value="App Development">App Development</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Ethical Hacking">Ethical Hacking</option>
                <option value="Data Science">Data Science</option>
                <option value="Web Development">Web Development</option>
                <option value="UI/UX Designing">UI/UX Designing</option>
                <option value="AI Tool">AI Tool</option>
                <option value="Data Analytics">Data Analytics</option>
              </select>
            </div>
            {/* Lever box */}
            <div className="flex-1">
              <label
                className="block text-sm font-medium text-gray-700 mt-1"
                htmlFor=""
              >
                {" "}
                Course Level
              </label>
              <select
                onChange={(e) => setLevel(e.target.value)}
                value={level}
                className="w-full border px-4 py-2  rounded-md bg-white"
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advance">Advance</option>
              </select>
            </div>
            {/* Price Box */}
            <div className="flex-1">
              <label
                className="block text-sm font-medium text-gray-700 mt-1"
                htmlFor="price"
              >
                {" "}
                Course Price
              </label>
              <input
                type="text"
                className="w-full border px-4 py-2 bg-white rounded-md "
                inputMode="numeric"
                placeholder="₹"
                id="price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
          </div>
          <div>
            <label htmlFor="">Course Thumbnail</label>
            <input
              type="file"
              hidden
              ref={thumb}
              accept="image"
              onChange={handleThumbnail}
            />
          </div>
          <div className="relative w-[300px]">
            <img
              src={frontImage || img}
              alt=""
              onClick={() => thumb.current.click()}
              className="w-[100%] h-[100%]  object-cover border border-black  rounded-[5px]"
            />
            <FaPen
              onClick={() => thumb.current.click()}
              className="absolute top-[4%] right-[3%]"
            />
          </div>

          <div className="flex gap-4">
            <button
            onClick={()=> navigate("/courses")}
              className="text-black bg-gray-200 px-3.5 py-1.5 rounded-md cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handelEditCourses}
              className="text-white bg-black px-3.5 py-1.5 rounded-md cursor-pointer"
              disabled={loading}
            >
              {loading ? <ClipLoader size={30} color="#fff" /> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourses;
