import express from "express";
import {
  loginController,
  logoutController,
  resetPassword,
  sendOtp,
  singUpController,
  verifyOtp,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", singUpController);

router.post("/login", loginController);

router.get("/logout", logoutController);

router.post("/sendOtp" , sendOtp);

router.post("/verifyOtp", verifyOtp);

router.post("/resetPassword", resetPassword);

export default router;
