import uploadOnCloudinary from "../config/cloudinary.js";
import UserModel from "../model/user.Model.js";

export const getCurrentUser = async (req, res) => {
  try {
    //   let userId = await  UserModel.findById(req.user).select("-password")
    let user = req.userId;

    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }
    return res.status(200).json({
      message: "User Find SuccessFully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    let userId = req.userId;
    // console.log("thi is my",req.file)

    let { name, description } = req.body;

    let photoUrl;

    if (req.file) {
      photoUrl = await uploadOnCloudinary(req.file.path);
    }

    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        name,
        description,
        photoUrl,
      },
      { new: true },
    );

    if (!user) {
      return res.status(400).json({
        message: "User Not find",
      });
    }
    //  await user.save()
    return res.status(200).json({
      success: true,
      message: "Profile Update successFully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User Not Update",
      error: error.message,
    });
  }
};



// export const updateProfile = async (req, res) => {
//   try {
//     const userId = req.user.id; // ✅ FIX

//     const { name, description } = req.body;

//     let updateData = {
//       name,
//       description,
//     };

//     if (req.file) {
//       const uploaded = await uploadOnCloudinary(req.file.path);

//       if (uploaded) {
//         updateData.photoUrl = uploaded;
//       }
//     }

//     const user = await UserModel.findByIdAndUpdate(
//       userId,
//       updateData,
//       { returnDocument: "after" } // ✅ new fix
//     );

//     if (!user) {
//       return res.status(400).json({
//         message: "User Not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Profile Updated Successfully",
//       data: user,
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "User Not Update",
//       error: error.message,
//     });
//   }
// };