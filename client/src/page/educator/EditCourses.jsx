// import React, { useEffect, useRef } from "react";
// import { useState } from "react";
// import { FaArrowLeftLong } from "react-icons/fa6";
// import { useNavigate, useParams } from "react-router";
// import img from "../../assets/empty.jpg";
// import { FaPen } from "react-icons/fa";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { ClipLoader } from "react-spinners";
// import { useDispatch, useSelector } from "react-redux";
// import { setCoursesData } from "../../redux/courseSlice";
// const EditCourses = () => {
//   let thumb = useRef();

//   let { courseId } = useParams();
//   console.log(courseId);

//   let navigate = useNavigate();
//   const [isPublished, setIsPublished] = useState(true);
//   const [selectedCourse, setSelectedCourse] = useState(null);

//   const [title, setTitle] = useState("");
//   const [subTitle, setSubTitle] = useState("");
//   const [descriptions, setDescriptions] = useState("");
//   const [category, setCategory] = useState("");
//   const [level, setLevel] = useState("");
//   const [price, setPrice] = useState("");
//   const [frontImage, setFrontImage] = useState(img);
//   const [backendImage, setBackendImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [deleteLoading, setDeleteLoading] = useState(false);
//   let dispatch = useDispatch();
//   let { courseData } = useSelector((state) => state.course);
//   const handleThumbnail = (e) => {
//     const file = e.target.files[0];
//     setBackendImage(file);
//     setFrontImage(URL.createObjectURL(file));
//   };

//   const getCourseId = async () => {
//     try {
//       let res = await axios.get(
//         `http://localhost:3000/api/courses/getCoursesId/${courseId}`,
//         { withCredentials: true },
//       );
//       setSelectedCourse(res.data.data);
//       console.log(res.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handelEditCourses = async () => {
//     setLoading(true);
//     let formData = new FormData();
//     formData.append("title", title);
//     formData.append("subtitle", subTitle);
//     formData.append("descriptions", descriptions);
//     formData.append("category", category);
//     formData.append("level", level);
//     formData.append("price", price);
//     formData.append("thumbnail", backendImage);
//     formData.append("isPublished", isPublished);

//     try {
//       let res = await axios.post(
//         `http://localhost:3000/api/courses/editCourses/${courseId}`,
//         formData,
//         { withCredentials: true },
//       );
//       console.log(res.data.data);

//       const updateData = res.data.data;

//      const coursesArray = Array.isArray(courseData?.data)
//    ? courseData.data
//    : [];

//       if (updateData.isPublished) {
//         const updateCourses = coursesArray.map((c) =>
//           c._id === courseId ? updateData : c,
//         );

//         if (!coursesArray.some((c) => c._id === courseId)) {
//           updateCourses.push(updateData);
//         }

//         dispatch(setCoursesData(updateCourses));
//       } else {
//         const filterCoursesData = coursesArray.filter(
//           (c) => c._id !== courseId,
//         );

//         dispatch(setCoursesData( ...courseData , filterCoursesData));
//       }
//       setLoading(false);
//       navigate("/courses");
//       toast.success("Courses Update");
//     } catch (error) {
//       console.log(error);
//       toast.error(error?.response?.data?.message || "Something went wrong");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (selectedCourse) {
//       setTitle(selectedCourse.title || "");
//       setSubTitle(selectedCourse.subTitle || "");
//       setDescriptions(selectedCourse.descriptions || "");
//       setCategory(selectedCourse.category || "");
//       setLevel(selectedCourse.level || "");
//       setPrice(selectedCourse.price || "");
//       setFrontImage(selectedCourse.thumbnail || img);
//       setIsPublished(selectedCourse?.isPublished);
//     }
//   }, [selectedCourse]);
//   useEffect(() => {
//     getCourseId();
//   }, []);

//  const handelDelete = async () => {
//   setDeleteLoading(true);

//   try {
//     const res = await axios.delete(
//       `http://localhost:3000/api/courses/remove/${courseId}`,
//       { withCredentials: true }
//     );

//     const coursesArray = Array.isArray(courseData?.data)
//    ? courseData.data
//    : [];

//     const filtered = coursesArray.filter(
//       (c) => c._id !== courseId
//     );

//     dispatch(setCoursesData(filtered));

//     toast.success("Course Removed");
//     navigate("/courses");
//   } catch (error) {
//     toast.error(
//       error?.response?.data?.message || "Delete failed"
//     );
//   } finally {
//     setDeleteLoading(false);
//   }
// };
//   return (
//     <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
//       {/* Top Bar */}
//       <div className=" flex items-center justify-center  gap-[20px] md:justify-between flex-col md:flex-row mb-6 relative">
//         <FaArrowLeftLong
//           onClick={() => navigate("/courses")}
//           className="top-[-20%] md:top-[20%] absolute left-0 md:left-[2%] w-6 h-7 cursor-pointer"
//         />
//         <h1 className="text-2xl font-semibold md:pl-[60px]">
//           Add details information regarding course
//         </h1>
//         <div>
//           <button className="text-white bg-black px-2 py-2.5 rounded-md">
//             Go to lectures page
//           </button>
//         </div>
//       </div>

//       {/* Form Details */}
//       <div className="bg-gray-50 p-6 rounded-md">
//         <h2>Basic Courses information</h2>
//         <div className=" space-y-2 space-x-2">
//           {!isPublished ? (
//             <button
//               onClick={() => setIsPublished((prev) => !prev)}
//               className="text-green-500 bg-green-100 border-2 px-2 py-1.5 border-gray-200 rounded-md cursor-pointer "
//             >
//               Click to Publish
//             </button>
//           ) : (
//             <button
//               onClick={() => setIsPublished((prev) => !prev)}
//               className="text-red-500 bg-red-100 border-2 px-2 py-1.5 border-gray-200 rounded-md cursor-pointer "
//             >
//               Click to UnPublish
//             </button>
//           )}
//           <button
//             onClick={handelDelete}
//             className="text-white bg-red-600 rounded-md  px-2 py-1.5 cursor-pointer"
//           >
//             Remove Courses
//           </button>
//         </div>
//         <form onSubmit={(e) => e.preventDefault()} className="space-y-6 ">
//           <div>
//             <label
//               className="block text-sm  font-medium text-gray-700 my-2"
//               htmlFor="title"
//             >
//               Title
//             </label>
//             <input
//               className="w-full border px-4 py-2 rounded-md"
//               type="text"
//               id="title"
//               placeholder="Courses Title"
//               onChange={(e) => setTitle(e.target.value)}
//               value={title}
//             />
//           </div>
//           <div>
//             <label
//               className="block text-sm  font-medium text-gray-700 my-2"
//               htmlFor="Subtitle"
//             >
//               SubTitle
//             </label>
//             <input
//               className="w-full border px-4 py-2 rounded-md"
//               type="text"
//               id="Subtitle"
//               placeholder="SubTitle"
//               onChange={(e) => setSubTitle(e.target.value)}
//               value={subTitle}
//             />
//           </div>
//           <div>
//             <label
//               className="block text-sm  font-medium text-gray-700 mb-1"
//               htmlFor="Disc"
//             >
//               Descriptions
//             </label>
//             <textarea
//               className="w-full resize-none border px-4 py-2 rounded-md"
//               type="text"
//               id="Disc"
//               placeholder="Courses Descriptions"
//               onChange={(e) => setDescriptions(e.target.value)}
//               value={descriptions}
//             ></textarea>
//           </div>

//           <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
//             {/* category box */}
//             <div className="flex-1">
//               <label
//                 className="block text-sm font-medium text-gray-700 mt-1"
//                 htmlFor=""
//               >
//                 {" "}
//                 Course Category
//               </label>
//               <select
//                 onChange={(e) => setCategory(e.target.value)}
//                 value={category}
//                 className="w-full border px-4 py-2  rounded-md bg-white"
//               >
//                 <option value="">Select Category</option>
//                 <option value="App Development">App Development</option>
//                 <option value="AI/ML">AI/ML</option>
//                 <option value="Ethical Hacking">Ethical Hacking</option>
//                 <option value="Data Science">Data Science</option>
//                 <option value="Web Development">Web Development</option>
//                 <option value="UI/UX Designing">UI/UX Designing</option>
//                 <option value="AI Tool">AI Tool</option>
//                 <option value="Data Analytics">Data Analytics</option>
//               </select>
//             </div>
//             {/* Lever box */}
//             <div className="flex-1">
//               <label
//                 className="block text-sm font-medium text-gray-700 mt-1"
//                 htmlFor=""
//               >
//                 {" "}
//                 Course Level
//               </label>
//               <select
//                 onChange={(e) => setLevel(e.target.value)}
//                 value={level}
//                 className="w-full border px-4 py-2  rounded-md bg-white"
//               >
//                 <option value="">Select Level</option>
//                 <option value="Beginner">Beginner</option>
//                 <option value="Intermediate">Intermediate</option>
//                 <option value="Advance">Advance</option>
//               </select>
//             </div>
//             {/* Price Box */}
//             <div className="flex-1">
//               <label
//                 className="block text-sm font-medium text-gray-700 mt-1"
//                 htmlFor="price"
//               >
//                 {" "}
//                 Course Price
//               </label>
//               <input
//                 type="text"
//                 className="w-full border px-4 py-2 bg-white rounded-md "
//                 inputMode="numeric"
//                 placeholder="₹"
//                 id="price"
//                 onChange={(e) => setPrice(e.target.value)}
//                 value={price}
//               />
//             </div>
//           </div>
//           <div>
//             <label htmlFor="">Course Thumbnail</label>
//             <input
//               type="file"
//               hidden
//               ref={thumb}
//               accept="image"
//               onChange={handleThumbnail}
//             />
//           </div>
//           <div className="relative w-[300px]">
//             <img
//               src={frontImage || img}
//               alt=""
//               onClick={() => thumb.current.click()}
//               className="w-[100%] h-[100%]  object-cover border border-black  rounded-[5px]"
//             />
//             <FaPen
//               onClick={() => thumb.current.click()}
//               className="absolute top-[4%] right-[3%]"
//             />
//           </div>

//           <div className="flex gap-4">
//             <button
//               onClick={() => navigate("/courses")}
//               className="text-black bg-gray-200 px-3.5 py-1.5 rounded-md cursor-pointer"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handelEditCourses}
//               className="text-white bg-black px-3.5 py-1.5 rounded-md cursor-pointer"
//               disabled={loading}
//             >
//               {loading ? <ClipLoader size={30} color="#fff" /> : "Save"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditCourses;



import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router";
import img from "../../assets/empty.jpg";
import { FaPen } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { setCoursesData } from "../../redux/courseSlice";

const EditCourses = () => {

  const thumb = useRef();

  const { courseId } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { courseData } = useSelector((state) => state.course);

  const [isPublished, setIsPublished] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

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

  // Thumbnail
  const handleThumbnail = (e) => {

    const file = e.target.files[0];

    setBackendImage(file);

    setFrontImage(URL.createObjectURL(file));

  };

  // Get Single Course
  const getCourseId = async () => {

    try {

      const res = await axios.get(
        `http://localhost:3000/api/courses/getCoursesId/${courseId}`,
        { withCredentials: true }
      );

      setSelectedCourse(res.data.data);

    } catch (error) {

      console.log(error);

    }

  };

  // Edit Course
  const handelEditCourses = async () => {

    setLoading(true);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("subtitle", subTitle);
    formData.append("descriptions", descriptions);
    formData.append("category", category);
    formData.append("level", level);
    formData.append("price", price);
    formData.append("thumbnail", backendImage);
    formData.append("isPublished", isPublished);

    try {

      const res = await axios.post(
        `http://localhost:3000/api/courses/editCourses/${courseId}`,
        formData,
        { withCredentials: true }
      );

      const updateData = res.data.data;

      // Redux Array
      const coursesArray = Array.isArray(courseData?.data)
        ? courseData.data
        : [];

      // Published
      if (updateData.isPublished) {

        const updateCourses = coursesArray.map((c) =>
          c._id === courseId ? updateData : c
        );

        // Agar Course Exist Nahi Karta
        if (!coursesArray.some((c) => c._id === courseId)) {

          updateCourses.push(updateData);

        }

        dispatch(
          setCoursesData({
            ...courseData,
            data: updateCourses,
          })
        );

      }

      // UnPublish
      else {

        const filterCoursesData = coursesArray.filter(
          (c) => c._id !== courseId
        );

        dispatch(
          setCoursesData({
            ...courseData,
            data: filterCoursesData,
          })
        );

      }

      toast.success("Course Updated");

      navigate("/courses");

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  };

  // Delete Course
  const handelDelete = async () => {

    setDeleteLoading(true);

    try {

      await axios.delete(
        `http://localhost:3000/api/courses/remove/${courseId}`,
        { withCredentials: true }
      );

      const coursesArray = Array.isArray(courseData?.data)
        ? courseData.data
        : [];

      const filtered = coursesArray.filter(
        (c) => c._id !== courseId
      );

      dispatch(
        setCoursesData({
          ...courseData,
          data: filtered,
        })
      );

      toast.success("Course Removed");

      navigate("/courses");

    } catch (error) {

      toast.error(
        error?.response?.data?.message || "Delete failed"
      );

    } finally {

      setDeleteLoading(false);

    }

  };

  // Set Course Data
  useEffect(() => {

    if (selectedCourse) {

      setTitle(selectedCourse.title || "");
      setSubTitle(selectedCourse.subTitle || "");
      setDescriptions(selectedCourse.descriptions || "");
      setCategory(selectedCourse.category || "");
      setLevel(selectedCourse.level || "");
      setPrice(selectedCourse.price || "");
      setFrontImage(selectedCourse.thumbnail || img);
      setIsPublished(selectedCourse.isPublished);

    }

  }, [selectedCourse]);

  // Get Course
  useEffect(() => {

    getCourseId();

  }, []);

  return (

    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">

      {/* Top */}
      <div className="flex items-center justify-between mb-6">

        <FaArrowLeftLong
          onClick={() => navigate("/courses")}
          className="w-6 h-7 cursor-pointer"
        />

        <h1 className="text-2xl font-semibold">
          Edit Course
        </h1>

      </div>

      {/* Form */}
      <div className="bg-gray-50 p-6 rounded-md">

        <div className="space-y-2 mb-5">

          {
            !isPublished ? (

              <button
                onClick={() => setIsPublished((prev) => !prev)}
                className="text-green-500 bg-green-100 border px-2 py-1.5 rounded-md"
              >
                Click to Publish
              </button>

            ) : (

              <button
                onClick={() => setIsPublished((prev) => !prev)}
                className="text-red-500 bg-red-100 border px-2 py-1.5 rounded-md"
              >
                Click to UnPublish
              </button>

            )
          }

          <button
            onClick={handelDelete}
            className="text-white bg-red-600 rounded-md px-2 py-1.5 ml-3"
          >
            {
              deleteLoading
                ? "Deleting..."
                : "Remove Course"
            }
          </button>

        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-6"
        >

          {/* Title */}
          <input
            type="text"
            placeholder="Course Title"
            className="w-full border px-4 py-2 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Subtitle */}
          <input
            type="text"
            placeholder="Subtitle"
            className="w-full border px-4 py-2 rounded-md"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            className="w-full border px-4 py-2 rounded-md"
            value={descriptions}
            onChange={(e) => setDescriptions(e.target.value)}
          />

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
          >
            <option value="">Select Category</option>

            <option value="App Development">
              App Development
            </option>

            <option value="AI/ML">
              AI/ML
            </option>

            <option value="Ethical Hacking">
              Ethical Hacking
            </option>

            <option value="Data Science">
              Data Science
            </option>

            <option value="Web Development">
              Web Development
            </option>

            <option value="UI/UX Designing">
              UI/UX Designing
            </option>

          </select>

          {/* Level */}
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
          >

            <option value="">
              Select Level
            </option>

            <option value="Beginner">
              Beginner
            </option>

            <option value="Intermediate">
              Intermediate
            </option>

            <option value="Advance">
              Advance
            </option>

          </select>

          {/* Price */}
          <input
            type="text"
            placeholder="₹ Price"
            className="w-full border px-4 py-2 rounded-md"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          {/* File */}
          <input
            type="file"
            hidden
            ref={thumb}
            accept="image/*"
            onChange={handleThumbnail}
          />

          {/* Image */}
          <div className="relative w-[300px]">

            <img
              src={frontImage || img}
              alt=""
              className="w-full border rounded-md cursor-pointer"
              onClick={() => thumb.current.click()}
            />

            <FaPen
              onClick={() => thumb.current.click()}
              className="absolute top-3 right-3 cursor-pointer"
            />

          </div>

          {/* Buttons */}
          <div className="flex gap-4">

            <button
              onClick={() => navigate("/courses")}
              className="bg-gray-200 px-4 py-2 rounded-md"
            >
              Cancel
            </button>

            <button
              onClick={handelEditCourses}
              disabled={loading}
              className="bg-black text-white px-4 py-2 rounded-md"
            >
              {
                loading
                  ? <ClipLoader size={20} color="#fff" />
                  : "Save"
              }
            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default EditCourses;