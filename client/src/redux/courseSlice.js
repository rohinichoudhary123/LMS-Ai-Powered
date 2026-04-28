import { createSlice } from "@reduxjs/toolkit";

 const courseSlice = createSlice({
  name: "course",
  initialState: {
    createCoursesData: [],
  },
  reducers: {
    setCreateCoursesData: (state, action) => {
      state.createCoursesData = action.payload;
    },
  },
});

export const { setCreateCoursesData } = courseSlice.actions;

export default courseSlice.reducer;
