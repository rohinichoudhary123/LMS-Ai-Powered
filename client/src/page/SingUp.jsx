import React, { useState } from "react";
import { useNavigate } from "react-router";
import logo from "../assets/logo.jpg";
import goggle from "../assets/google.jpg";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/UserSlice";
const SingUp = () => {
  const [show, setShow] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const handleSingUp = async () => {
    setLoading(true);
    try {
      let res = await axios.post(
        "http://localhost:3000/api/auth/register",
        { name, email, password, role },
        { withCredentials: true },
      );
      setLoading(false);
      navigate("/");
      toast.success("SingUp SuccessFully");
      // dispatch(setUserData(res.data))
        dispatch(setUserData(res.data.data))
      console.log(res.data);
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message);
      setLoading(false);
      dispatch(setUserData(null))
    }
  };

  return (
    <div className="bg-[#dddbdd] w-screen  h-screen flex items-center justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex"
      >
        {/* left div */}
        <div className="md:w-[50%] w-[100%] h-full flex bg-white shadow-xl items-center  flex-col justify-center gap-3">
          <div>
            <h1 className="font-semibold text-black text-2xl">
              Let's get Started
            </h1>
            <h2 className="text-[#999797] text-[18px]">Create your account</h2>
          </div>

          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              className="border w-[100%] h-[35px] border-[#e7e6e6] text-[15px]  px-[20px]"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              className="border w-[100%] h-[35px] border-[#e7e6e6] text-[15px]  px-[20px]"
              type="text"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              className="border w-[100%] h-[35px] border-[#e7e6e6] text-[15px]  px-[20px]"
              type={show ? "text" : "password"}
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            {!show ? (
              <IoEyeOutline
                onClick={() => setShow((prev) => !prev)}
                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
              />
            ) : (
              <IoEyeOffOutline
                onClick={() => setShow((prev) => !prev)}
                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
              />
            )}
          </div>

          <div className=" flex md:w-[50%] gap-9 w-[70%] items-center justify-center">
            <span
              onClick={() => setRole("Student")}
              className={`px-[10px] py-[5px] border-2 border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black ${role === "Student" ? " border-black" : "border-[#646464]"}`}
            >
              Student
            </span>
            <span
              onClick={() => setRole("Educator")}
              className={`px-[10px] py-[5px] border-2 border-[#e7e6e6] rounded-xl cursor-pointer hover:border-black ${role === "Educator" ? " border-black" : "border-[#646464]"}`}
            >
              Educator
            </span>
          </div>
          <button
            onClick={handleSingUp}
            className="w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]"
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color="#fff" /> : "Sign Up"}
          </button>
          <div className="w-[80%] flex items-center gap-2">
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
            <div className="w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center">
              Or Continue with
            </div>
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
          </div>
          <div className="w-[80%] h-[40px] border border-black rounded-5px flex items-center  justify-center">
            <img src={goggle} className="h-[29px] w-[29px]" alt="" />
            <span className="text-[18px] text-gray-500">oogle</span>
          </div>
          <div className="text-[#6f6f6f]">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="underline text-black underline-offset-1"
            >
              Login
            </span>
          </div>
        </div>

        {/* right div */}
        <div className="w-[50%] h-full rounded-r-2xl   bg-black md:flex flex-col items-center justify-center hidden">
          <img className="h-30 shadow-2xl" src={logo} alt="" />
          <h1 className="text-white text-xl font-semibold ">LMS</h1>
        </div>
      </form>
    </div>
  );
};

export default SingUp;
