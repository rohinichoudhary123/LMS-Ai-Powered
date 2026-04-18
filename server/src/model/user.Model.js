import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description:{
        type:String,
        // required:[true , " Description is Required"],
    },
    email:{
        type:String,
        required:[true , "Email is Required"],
        unique:[true , "Email is unique"]
    },
    password:{
        type:String,
        required:[true , "Pass word is required"]

    },
    role:{
            type:String,
            enum:["Student" , "Educator"],
            required:[true , "ROle  is required"]
    }, 
    photoUrl:{
        type:String,
        default:''
    },
    enrolledCourse:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Courses"
    }],
     resetOtp:{
        type:String
    },
    otpExpires:{
        type:Date
    },
    isOtpVerify:{
        type:Boolean,
        default:false
    }
  },
  
  { timestamps: true },
);


 const  UserModel = mongoose.model("users" , UserSchema)

 export default  UserModel