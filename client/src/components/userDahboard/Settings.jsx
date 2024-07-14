import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { useSelector } from "react-redux";

const Settings = () => {
  const user = useSelector((state) => state.auth.user);
  const [userImage, setUserImage] = useState(user?.pfp || "");
  const [name, setName] = useState(user?.name || "");
  const [state, setState] = useState(user?.state || "");
  const [city, setCity] = useState(user?.city || "");
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setUserImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !state || !city || !imageFile) {
        console.log("All fields are required");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("state", state);
      formData.append("city", city);
      formData.append("pfp", imageFile);

      const response = await axiosInstance.put("/ragpicker/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("response: ", response);
    } catch (error) {
      console.log("Error while submitting: ", error);
    }
  };

  return (
    <div className="mx-auto text-white">
      <div className="my-8 font-bold text-3xl">Update details :</div>
      <div className="max-w-500px w-[290px] sm:w-[500px] mx-auto p-6 backdrop-blur-md bg-white/10 rounded-lg shadow-lg flex flex-col gap-6 text-white">
        <div className="relative mx-auto w-24 h-24 mb-6">
          <img
            src={userImage}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-blue-500 shadow-md mx-auto"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="profileImageInput"
            onChange={handleImageChange}
          />
          <label
            htmlFor="profileImageInput"
            className="absolute bottom-0 right-0 p-1 bg-gray-800 rounded-full cursor-pointer"
          >
            <FaCamera className="text-white" />
          </label>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 rounded bg-gray-800 text-white border border-gray-700"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="mt-1 p-2 rounded bg-gray-800 text-white border border-gray-700"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 p-2 rounded bg-gray-800 text-white border border-gray-700"
            />
          </div>

          <button
            type="submit"
            className="mt-4 p-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
