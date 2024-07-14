import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { useSelector } from "react-redux";

const Settings = () => {
  const user = useSelector(state => state.auth.user);
  const [userImage, setUserImage] = useState(user?.pfp || "");
  const [name, setName] = useState(user?.name || "");
  const [address, setAddress] = useState(user?.address || "");
  const [age, setAge] = useState(user?.age || "");
  const [pricePerHour, setPricePerHour] = useState(user?.pricePerHour || "");

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profilePicture', file);

      try {
        const res = await axiosInstance.post('/rp/profile-picture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log("Profile picture updated:", res.data);
        setUserImage(res.data.updatedProfilePictureUrl); // Update based on your backend response
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !address || !age || !pricePerHour) {
        console.log("All fields are required");
        return;
      }
      const response = await axiosInstance.put("/rp/update", {
        name,
        address,
        age,
        pricePerHour
      });
      console.log("Response:", response);
    } catch (error) {
      console.log("Error while submitting:", error);
    }
  };

  return (
    <div className="mx-auto text-white">
      <div className="my-8 font-bold text-3xl">Update details:</div>
      <div className="max-w-500px w-[290px] sm:w-[500px] mx-auto p-6 backdrop-blur-md bg-white/10 rounded-lg shadow-lg flex flex-col gap-6 text-white">
        <div className="relative mx-auto w-24 h-24 mb-6">
          <img
            src={userImage}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-blue-500 shadow-md mx-auto"
            name="profilePicture"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="profilePicture"
            onChange={handleImageChange}
          />
          <label
            htmlFor="profilePicture"
            className="absolute bottom-0 right-0 p-1 bg-gray-800 rounded-full cursor-pointer"
          >
            <FaCamera className="text-white" />
          </label>
        </div>

        <form className="flex flex-col gap-4">
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
            <label className="text-sm font-medium">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 p-2 rounded bg-gray-800 text-white border border-gray-700"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 p-2 rounded bg-gray-800 text-white border border-gray-700"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Price per Hour</label>
            <input
              type="number"
              value={pricePerHour}
              onChange={(e) => setPricePerHour(e.target.value)}
              className="mt-1 p-2 rounded bg-gray-800 text-white border border-gray-700"
            />
          </div>

          <button
            type="submit"
            className="mt-4 p-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            onClick={handleSubmit}
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
