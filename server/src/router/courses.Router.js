import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import { createCourses, editCourses, getCoursesId, getCreateCourses, getPublicCourses, removeCourses } from "../controllers/courses.controller.js"
import upload from "../middlewares/multer.js "


const coursesRouter = express.Router()


coursesRouter.post("/cerate" , authMiddleware , createCourses)

coursesRouter.get("/getPublishedCourses" , getPublicCourses)

coursesRouter.get("/getCreate" , authMiddleware ,  getCreateCourses)

coursesRouter.post("/editCourses/:courseId" ,authMiddleware , upload.single("thumbnail") , editCourses)

coursesRouter.get("/getCoursesId/:courseId" , authMiddleware ,  getCoursesId)

coursesRouter.delete("/remove/:courseId"  , authMiddleware , removeCourses)

export default coursesRouter