import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";

const Settings = () => {
  const [userImage, setUserImage] = useState("path/to/default/image.jpg");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mx-auto text-white">
      <div className="my-8 font-bold text-3xl">Update details :</div>
      <div className="max-w-500px w-[80%] sm:w-[500px] mx-auto p-6 backdrop-blur-md bg-white/10 rounded-lg shadow-lg flex flex-col gap-6 text-white">
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
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;