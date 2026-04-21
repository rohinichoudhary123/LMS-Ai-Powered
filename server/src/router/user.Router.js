import express from "express";
import { getCurrentUser, updateProfile } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/get-user", authMiddleware , getCurrentUser);
router.post("/profile", authMiddleware , upload.single("photoUrl") ,  updateProfile)
export default router;
