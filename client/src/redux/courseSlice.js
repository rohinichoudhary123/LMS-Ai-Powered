  import { createSlice } from "@reduxjs/toolkit";

  const courseSlice = createSlice({
    name: "course",
    initialState: {
      createCoursesData: [],
      courseData: [],
    },
    reducers: {
      setCreateCoursesData: (state, action) => {
        state.createCoursesData = action.payload;
      },
      setCoursesData: (state, action) => {
        state.courseData = action.payload;
      },
    },
  });

  export const { setCreateCoursesData, setCoursesData } = courseSlice.actions;

  export default courseSlice.reducer;
