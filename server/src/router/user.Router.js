import express from "express";
import { getCurrentUser } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get-user", authMiddleware , getCurrentUser);
export default router;
