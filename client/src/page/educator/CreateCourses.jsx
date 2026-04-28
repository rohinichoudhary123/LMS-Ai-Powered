import axios from "axios";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const CreateCourses = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlerSubmit = async () => {
    setLoading(true);
    try {
      let res = await axios.post(
        "http://localhost:3000/api/courses/create",
        { title, category },
        { withCredentials: true },
      );
      console.log(res.data);

      setLoading(false);
      navigate("/courses");
      toast.success("create Courses SuccessFully");
    } catch (error) {
      console.log(error);

      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center  justify-center  bg-gray-100 px-4 py-10">
      <div className="max-w-xl w-[600px] mx-auto p-6 bg-white shadow-md rounded-md pt-10  relative">
        <FaArrowLeftLong
          onClick={() => navigate("/courses")}
          className="top-[8%] absolute left-[5%] w-[22px] h-[22px] cursor-pointer"
        />
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Create Courses
        </h1>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="title"
            >
              Courses Title
            </label>
            <input
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[black]"
              type="text"
              placeholder="Enter Courses title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="Cat"
            >
              Category
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[black]"
              id="cat"
              onChange={(e) => setCategory(e.target.value)}
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

          <button
            onClick={handlerSubmit}
            className="w-full bg-black text-white py-2 px-4 rounded-md active:bg-[#3a3a3a] transition"
          >
            {loading ? <ClipLoader size={30} color="#fff" /> : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourses;
