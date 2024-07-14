import React from "react";
import { useSelector } from "react-redux";
import { FaLocationDot } from "react-icons/fa6";
import LiveMap from "../../Maps/LiveMap";

const UserProfile = () => {
  const user = useSelector((state) => state.auth?.user);
  console.log(user);

  return (
    <div className="lg:p-10 py-5 mx-auto flex flex-col  lg:grid lg:grid-cols-2 w-full bg-white lg:gap-10 gap-5 bg-white/10 backdrop-blur-md rounded-lg shadow-lg text-white">
      <div>
        <div className="flex  flex-wrap justify-betwee   gap-6 rounded-lg p-5">
          {/* Profile Picture Section */}
          <div className="flex-shrink-0">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-24 h-24 rounded-full border-2 border-blue-500 shadow-md"
            />
          </div>

          {/* User Information Section */}
          <div className="text-center lg:text-left">
            <p className="text-2xl font-bold">{user?.name}</p>
            <p className="text-sm text-gray-200">@{user?.username}</p>
            <p className="text-sm text-gray-200">{user?.email}</p>
            <p className="text-gray-200 flex items-center justify-center lg:justify-start gap-2">
              <FaLocationDot className="text-blue-500" />
              {user?.city}, {user?.state}
            </p>
          </div>
        </div>


        {/* ongoing */}

        <div className="bg-white/10 relative rounded-lg shadow-lg p-2 my-10">
          <div className="h-2 w-2 absolute top-0 left-0 bg-green-500 animate-ping rounded-full"></div>

          <div className=" flex items-center gap-4 ">
            <img src="" alt="" className="w-14 h-14 rounded-full ring shadow" />

            <div>
              <h3 className="text-blue-500 text-xl ">
                Raju Bhai
              </h3>
              <p className="text-sm text-gray-200">@{user?.username}</p>
              <p className="text-sm text-gray-200">{user?.email}</p>
            </div>

          </div>

          <div className="text-white" >
            <p>Booked for - 4 hr </p>
            <p> from : 2 am - 7pm</p>

          </div>
          


        </div>


      </div>

      <div className="w-full h-[400px] rounded-xl border">
        <LiveMap />
      </div>
    </div>
  );
};

export default UserProfile;
