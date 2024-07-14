import React from "react";
import OngoingJob from "../ragpickerDashboard/OngoingJob";
import LiveMap from "../../Maps/LiveMap";
import { useSelector } from "react-redux";

const RagPickerProfile = ({
}) => {

  const user = useSelector(state=>state.auth.user);
  return (
    <div className="p-4 mx-auto  flex w-[90%] md:w-[75%] flex-col md:flex-row   md:justify-around bg-white/10 backdrop-blur-md rounded-lg shadow-lg text-white">
      <div className="flex md:w-[40%] gap-6  rounded-lg p-4">
        {/* Profile Picture Section */}
        <div className="flex-shrink-0">
          <img
            src={user?.pfp}
            alt={user?.name}
            className="w-24 h-24 rounded-full border-2 border-blue-500 shadow-md"
          />
        </div>

        {/* User Information Section */}
        <div className="flex flex-col">
          <p className="text-2xl font-semibold">{user?.name}</p>
          <p className="text-sm text-gray-300">@{user?.username}</p>
          <p className="text-sm text-gray-300">{user?.email}</p>
        </div>

      </div>
      <div className="max-sm:my-7 w-[98%] md:w-[500px] h-[400px] rounded-lg " >
        <LiveMap/>
      </div>
    </div>
  );
};

export default RagPickerProfile;
