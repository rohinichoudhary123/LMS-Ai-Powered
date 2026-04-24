import axios from "axios";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setUserData } from "../redux/UserSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const EditPage = () => {
  let navigate = useNavigate();
  let { userData } = useSelector((state) => state.user);
  console.log(userData);
  
  const [name, setName] = useState(userData.name || "");
  const [description, setDescription] = useState(userData.description || "");
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  console.log(name, description);
  console.log(photoUrl);

  const updateProfilePage = async (data) => {
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("description", description);

    if (photoUrl) {
      formdata.append("photoUrl", photoUrl);
    }
    setLoading(true);
    try {
      let res = await axios.post(
        "http://localhost:3000/api/user/profile",
        formdata,
        { withCredentials: true },
      );

      dispatch(setUserData(res.data.data));
      console.log(res.data);

      setLoading(false);
      navigate("/");
      toast.success("Profile Update ");
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center">
      <div className=" bg-white shadow-lg rounded-2xl px-6 py-3 max-w-xl w-full">
        <div className="flex  items-center gap-[36%]">
          {" "}
          <FaArrowLeftLong onClick={() => navigate("/")} className="text-xl" />
          <h1 className="text-xl font-semibold text-center">Edit Profile</h1>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div className=" flex flex-col  items-center justify-center">
            {userData?.photoUrl ? (
              <img
                className="w-24 h-24  rounded-full object-cover border-4 border-black"
                src={userData?.photoUrl}
                alt=""
              />
            ) : (
              <div className=" h-24 w-24 rounded-full text-white  flex items-center justify-center text-[30px] border-2 bg-black  border-white">
                {userData?.name ? userData.name.slice(0, 1).toUpperCase() : "?"}
              </div>
            )}
          </div>

          <div>
            <label
              className="text-sm  font-medium text-gray-700"
              htmlFor="image"
            >
              Select Avatar
            </label>

            <input
              id="image"
              type="file"
              name="photoUrl"
              accept="image/*"
              
              placeholder="photoUrl"
              onChange={(e) => setPhotoUrl(e.target.files[0])}
              className="w-full px-4 py-2 cursor-pointer  border rounded-md text-sm"
            />
          </div>

          <div>
            <label
              className="text-sm font-medium text-gray-700 "
              htmlFor="Name"
            >
              Full Name
            </label>
            <input
              className="w-full  cursor-pointer  px-4 py-2 border rounded-md text-sm"
              id="name"
              type="text"
              placeholder={userData?.name || " "}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label
              className="text-sm font-medium text-gray-700 "
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full cursor-not-allowed   px-4 py-2 border rounded-md text-sm"
              readOnly
              type="text"
              placeholder={userData?.email}
            />
          </div>
          <div>
            <label
              className="text-sm font-medium text-gray-700 "
              htmlFor="Description"
            >
              Description
            </label>
            <textarea
              rows={3}
              className="w-full mt-1 px-4 py-2 border cursor-pointer border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-[black]"
              placeholder="Tell us about yourself"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

            <button
              onClick={updateProfilePage}
              className="text-white  cursor-pointer  bg-black w-full py-2 rounded-md"
              disabled={loading}
            >
              {loading ? <ClipLoader size={30} color="#fff" /> : "Save Changes"}
            </button>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
