import genToken from "../config/token.js";
// import otpModel from "../model/otp.Model.js";
import UserModel from "../model/user.Model.js";
import bcrypt from "bcrypt";
import validator from "validator";
import sendMail from "../services/sendMail.js";

export const singUpController = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(401).json({
        message: "All field are required",
      });
    }

    let existUser = await UserModel.findOne({ email });

    if (existUser) {
      return res.status(400).json({
        message: "User Already exist",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(404).json({
        message: "Enter valid Email",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: " Enter strong password",
      });
    }

    let hashPass = await bcrypt.hash(password, 10);

    let newUser = await UserModel.create({
      name,
      email,
      password: hashPass,
      role,
    });

    if (!newUser) {
      return res.status(401).json({
        message: "Something went wrong",
      });
    }

    // let token =  jwt.sign({id: newUser._id} , config.JWT_SECRET ,{
    //     expiresIn:"1h"
    // })

    // res.cookie("token"  , token)

    let token = await genToken(newUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      success: true,
      message: " User Register Successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      success: false,
      message: " Internal server error",
      error: error.message,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: " All Field are required",
      });
    }

    let existUser = await UserModel.findOne({ email });

    if (!existUser) {
      return res.status(401).json({
        message: "User Not Found",
      });
    }

    let isMatch = await bcrypt.compare(password, existUser.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect Password",
      });
    }

    let token = await genToken(existUser._id);

    // let token =  jwt.sign({id: existUser._id} , config.JWT_SECRET ,{
    //     expiresIn:"1h"
    // })

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      message: " User Login Successfully",
      data: existUser,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const logoutController = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "User Logout SuccessFully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const sendOtp = async (req, res) => {
  console.log("request came")
  try {
    let { email } = req.body;
    console.log("check 1")

    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }
    console.log("check 2")

    let otp = Math.floor(1000 + Math.random() * 9999);
    let otpHash = await bcrypt.hash(otp.toString(), 10);
    user.resetOtp = otpHash;
    // user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
    user.isOtpVerify = false;
    console.log("check 3")


    await user.save();

    console.log("check 4")
    
    // await sendMail(email, otp);
    await sendMail({
      to: email,
      subject: "Reset Your Password",
      html: `<p>Your OTP for Password Reset is <b> ${otp}</b>. It expires in 5 minutes. </p>`,
    });
    console.log("check 5")

    return res.status(200).json({
      success: true,
      message: "OTP Send SuccessFully",
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    let { email, otp } = req.body;

    let user = await UserModel.findOne({ email });
    const isMatch = await bcrypt.compare(otp.toString(), user.resetOtp);
    if (!user || !isMatch || user.otpExpires < Date.now()) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }
     user.isOtpVerify = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
   

    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP  verify  successFully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await UserModel.findOne({ email });

    if (!user || !user.isOtpVerify) {
      return res.status(400).json({
        message: "OTp Verification is required",
      });
    }

    let hashPass = await bcrypt.hash(password, 10);

    user.password = hashPass;

    user.isOtpVerify = false;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Reset Password SuccessFully",
    });
  } catch (error) {
   console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};
