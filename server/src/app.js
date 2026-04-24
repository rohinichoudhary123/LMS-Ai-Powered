import express from "express";
import dotenv from "dotenv"
dotenv.config()
import authRouter from "./router/auth.Router.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from "./router/user.Router.js";
import coursesRouter from "./router/courses.Router.js";

const app = express();


app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.get("/" , (req , res) =>{
    res.send("This is user page")
})

app.use("/api/auth" , authRouter)
app.use("/api/user", userRouter)
app.use("/api/courses" , coursesRouter)
export default app;
