import React from "react";
import OngoingJob from "../ragpickerDashboard/OngoingJob";

const UserProfile = ({ 
  userImage = "path/to/default/image.jpg", 
  userName = "John Doe", 
  userUsername = "john_doe", 
  userEmail = "john@example.com" 
}) => {
  return (
    <div className="p-4 mx-auto  flex w-[90%] md:w-[75%] flex-col md:flex-row  gap-7 md:justify-around bg-white/10 backdrop-blur-md rounded-lg shadow-lg text-white">
      <div className="flex flex-col md:w-[40%] gap-6 backdrop-blur-md border border-white/20 rounded-lg p-4">
        {/* Profile Picture Section */}
        <div className="flex-shrink-0">
          <img
            src={userImage}
            alt={userName}
            className="w-24 h-24 rounded-full border-2 border-blue-500 shadow-md"
          />
        </div>

        {/* User Information Section */}
        <div className="flex flex-col">
          <p className="text-2xl font-semibold">{userName}</p>
          <p className="text-sm text-gray-300">@{userUsername}</p>
          <p className="text-sm text-gray-300">{userEmail}</p>
        </div>

        Ongoing job
        <OngoingJob/>
      </div>
      <div className="my-7 w-[98%] md:w-[500px] backdrop-blur-md border border-white/20 rounded-lg p-4" >
        map
      </div>
    </div>
  );
};

export default UserProfile;
