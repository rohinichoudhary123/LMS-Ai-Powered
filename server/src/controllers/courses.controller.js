import uploadOnCloudinary from "../config/cloudinary.js";
import CoursesModel from "../model/course.Model.js";

export const createCourses = async (req, res) => {
  try {
    let { title, category } = req.body;


    if (!title || !category) {
      return res.status(400).json({
        message: "title and category is required",
      });
    }

    let courses = await CoursesModel.create({
      title,
      category,
      createdBy: req.userId,
    });

    console.log(courses);

    console.log(req.userId);

    if (!courses) {
      return res.status(400).json({
        message: "Courses are not created",
      });
    }
    return res.status(200).json({
      data: courses,
    });
  } catch (error) {
    console.log("Error in createCourses:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const getPublicCourses = async (req, res) => {
  try {
    let courses = await CoursesModel.find({ isPublished: true });

    if (!courses) {
      return res.status(400).json({
        message: "Course is not public",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course is Publish successFully",
      data: courses,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Interval server error",
      error: error.message,
    });
  }
};

export const getCreateCourses = async (req, res) => {
  try {
    const userId = req.userId;
    let course = await CoursesModel.find({ createdBy: userId });

    if (!course) {
      return res.status(400).json({
        message: "Courses is not found",
      });
    }

    return res.status(200).json({
      success:true,
      message:" get Create Courses SuccessFully",
      data:course
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Interval server error",
      error: error.message,
    });
  }
};

export const editCourses = async (req, res) => {
  try {
    let { courseId } = req.params;

    let { title, subTitle, description, category, level, isPublished, price } =
      req.body;

    let thumbnail;

    if (req.file) {
      thumbnail = await uploadOnCloudinary(req.file.path);
    }

    let course = await CoursesModel.findById(courseId);

    if (!course) {
      return res.status(400).json({
        message: "Courses is not Found",
      });
    }

    let updateData = {
      title,
      subTitle,
      description,
      category,
      level,
      isPublished,
      price,
      thumbnail,
    };

    let UpdateCourse = await CoursesModel.findByIdAndUpdate(
      courseId,
      updateData,
        { returnDocument: "after" }
    );

    return res.status(200).json({
      success: true,
      message: "Edit Courses SuccessFully",
      data: UpdateCourse,
    });
  } catch (error) {
    console.log("This is edit controller Error", error);

    return res.status(500).json({
      success: false,
      message: "Interval server error",
      error: error.message,
    });
  }
};

export const getCoursesId = async (req, res) => {
  try {
    let { courseId } = req.params;

    let course = await CoursesModel.findById(courseId);

    if (!course) {
      return res.status(400).json({
        message: "Courses is not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Find the Courses id SuccessFully",
      data: course,
    });
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({
      success: false,
      message: "Interval server error",
      error: error.message,
    });
  }
};

export const removeCourses = async (req, res) => {
  try {
    let { courseId } = req.params;

    let course = await CoursesModel.findById(courseId);

    if (!course) {
      return res.status(400).json({
        message: "Courses is Not Found",
      });
    }
    let removeCourse = await CoursesModel.findByIdAndDelete(courseId,   { returnDocument: "after" });

    return res.status(200).json({
      success: true,
      message: "Remove Course successFully ",
    });
  } catch (error) {
    console.log("This is remove Courses Controller error", error);

    return res.status(500).json({
      success: false,
      message: "Interval server error",
      error: error.message,
    });
  }
};
