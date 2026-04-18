import jwt from "jsonwebtoken";
import UserModel from "../model/user.Model.js";

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies.token;
  // console.log( "This is token message",token);
  
  if (!token) {
    return res.status(401).json({
      message: "Token Not Fround",
    });
  }

  let decode = jwt.verify(token, process.env.JWT_SECRET);
// console.log("Decoded:", decode);
// console.log("UserId from token:", decode.userId);
 
  if (!decode) {
    return res.status(401).json({
      message: "Unauthorized Token",
    });
  }

  let user = await UserModel.findById(decode.userId);

  req.user = user;

  // console.log( "This is User message",user);
  // console.log(req.user)
  next();
  } catch (error) {
     console.log(error)

     return res.status(500).json({
      success:false,
      message:"Internal server error",
      error:error.message
     })
  }
};

export default authMiddleware;
