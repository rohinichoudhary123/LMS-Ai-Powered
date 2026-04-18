import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    let res = await mongoose.connect(process.env.MONGO_URL);
    if (res) {
      console.log("Mongoose is connected");
    }
  } catch (error) {
    console.log("Mongoose is not connected" , error.message);
  }
};
