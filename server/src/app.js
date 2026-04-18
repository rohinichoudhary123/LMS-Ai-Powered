import express from "express";
import dotenv from "dotenv"
import authRouter from "./router/auth.Router.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from "./router/user.Router.js";
dotenv.config()
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
export default app;
