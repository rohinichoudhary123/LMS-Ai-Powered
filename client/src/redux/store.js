import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserSlice.js";
import  courseSlice  from "./courseSlice.js";

export const store = configureStore({
  reducer: {
    user: userSlice,
    course:courseSlice
  },
});
