import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { setUserData } from "../redux/UserSlice";
import { ClipLoader } from "react-spinners";

const ForgetPass = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [ConPassword, setConPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //  step 1
  const sendOtp = async () => {
    setLoading(true);
    try {
      let res = await axios.post(
        "http://localhost:3000/api/auth/sendOtp",
        { email },
        {
          withCredentials: true,
        },
      );

      setLoading(false);
      setStep(2);
      toast.success("OTP sent successfully");
      console.log(res.data);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  //  step2
  const verifyOtp = async () => {
    setLoading(true);
    try {
      let res = await axios.post(
        "http://localhost:3000/api/auth/verifyOtp",
        { email, otp },
        { withCredentials: true },
      );

      toast.success("verify otp successfully");
      setStep(3);

      setLoading(false);
      console.log(res.data);
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message);
      setLoading(false);
    }
  };

  // step 3

  const resetPassword = async () => {
    try {
      if (newPassword !== ConPassword) {
        console.log("Password is not match");
        toast.error("Password is not match");
        return;
      }
      setLoading(true);
      let res = await axios.post(
        "http://localhost:3000/api/auth/resetPassword",
        { email, password: newPassword },
        { withCredentials: true },
      );

      toast.success("reset password successfully");
      navigate("/login");

      setLoading(false);
      console.log(res.data);
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex  items-center justify-center bg-gray-100 px-4">
      {/* step 1 */}
      {step == 1 && (
        <div className=" bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Forget Your Password
          </h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm   font-medium text-gray-700 "
              >
                Enter your Email Address
              </label>
              <input
                type="text"
                id="email"
                placeholder="you@gmail.com"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="mt-1 w-full px-4 py-2   border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2  focus:ring-[black] cursor-pointer"
              />
              <button
                onClick={sendOtp}
                className="  mt-2 w-full bg-black hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md cursor-pointer"
                disabled={loading}
              >
                {loading ? <ClipLoader size={30} color="#fff" /> : "Send Otp"}
              </button>
            </div>
          </form>
          {/* <span onClick={() => navigate("/login")} className="block mt-1 text-center cursor-pointer">Back To Login</span> */}
          <div
            onClick={() => navigate("/login")}
            className="text-sm text-center mt-3 "
          >
            Back To Login
          </div>
        </div>
      )}
      {/* step 2 */}
      {step == 2 && (
        <div className=" bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Enter OTP
          </h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm   font-medium text-gray-700 "
              >
                Please enter the 4-digit code sent to your email
              </label>
              <input
                type="text"
                id="otp"
                placeholder="Enter Here"
                required
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                className="mt-1 w-full px-4 py-2   border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2  focus:ring-[black] cursor-pointer"
              />
              <button
                onClick={verifyOtp}
                className="  mt-2 w-full bg-black hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md cursor-pointer"
                disabled={loading}
              >
                {loading ? <ClipLoader size={30} color="#fff" /> : "Verify OTP"}
              </button>
            </div>
          </form>
          {/* <span onClick={() => navigate("/login")} className="block mt-1 text-center cursor-pointer">Back To Login</span> */}
          <div
            onClick={() => navigate("/login")}
            className="text-sm text-center mt-3 "
          >
            Back To Login
          </div>
        </div>
      )}
      {/* step 3 */}
      {step == 3 && (
        <div className=" bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6  text-center text-gray-800">
            Forget Your Password
          </h2>
          {/* <p className="text-sm mb-2.5 text-gray-400">Enter a new password below to regain access to your account</p> */}
          <p className="text-sm text-center text-gray-500 mb-6 ">
            Enter a new password below to regain access to your account
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm   font-medium text-gray-700 "
              >
                New Password
              </label>
              <input
                type="text"
                id="password"
                placeholder="Enter New Password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2   border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2  focus:ring-[black] cursor-pointer"
              />
            </div>
            <div>
              <label
                htmlFor="ConPassword"
                className="block text-sm   font-medium text-gray-700 "
              >
                Confirm Password
              </label>
              <input
                type="text"
                id="ConPassword"
                placeholder="Re-render new password"
                required
                value={ConPassword}
                onChange={(e) => setConPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2   border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2  focus:ring-[black] cursor-pointer"
              />
              <button
                onClick={resetPassword}
                className="  mt-2 w-full bg-black hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md cursor-pointer"
                disabled={loading}
              >
                {loading ? (
                  <ClipLoader size={30} color="#fff" />
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </form>
          {/* <span onClick={() => navigate("/login")} className="block mt-1 text-center cursor-pointer">Back To Login</span> */}
          <div
            onClick={() => navigate("/login")}
            className="text-sm text-center mt-4 "
          >
            Back To Login
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgetPass;
