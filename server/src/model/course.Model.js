import mongoose  from "mongoose";



const  CoursesScheme = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    subTitle:{
        type:String
    },
    description:{
        type:String
    },
    category:{
        type:String,
        required:true
    },
    level:{
        enum:["Beginner" , "Intermediate" , " Advanced"]
    },
    price:{
        type:true,
        required:true
    },
    thumbnail:{
       type:String,
    //    required:true
    },
    enrollmentStudent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    lecture:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"lecture"
    },
    create:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    isPublished:{
        type:Boolean,
        default:false
    },
    review:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"review"
    }


} ,{
    timestamps:true
})



const CoursesModel = mongoose.model("courses" , CoursesScheme)


export default CoursesModel