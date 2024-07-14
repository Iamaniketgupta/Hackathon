import React, { useEffect, useState } from 'react';
import { FaCalendarCheck, FaCheckCircle, FaDollarSign, FaStar } from 'react-icons/fa';
import CompletedJob from './CompletedJob';
import OngoingJob from './OngoingJob';
import BookingOffers from './BookingOFfers';
import "./style.css";
import axiosInstance from '../../axiosConfig/axiosConfig';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const [totalBookings, setTotalBookings] = useState(0);
  const [jobCompletedLength, setJobCompletedLength] = useState(0);
  const [jobCompleted, setJobCompleted] = useState([]);
  const [totalEarned, setTotalEarned] = useState(0);
  const user = useSelector(state => state.auth.user);
  const [rating, setRating] = useState(user?.ratings);
  const [unacceptedBookings, setUnacceptedBookings] = useState([]);
  const [ongoingTask, setOngoingTask] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  const getTotalBookings = async () => {
    try {
      const res = await axiosInstance(`/booking/getAllBookings/${user._id}`);
      if (res) {
        setTotalBookings(res?.data?.data.length);
        const ongoing = res.data.data.filter((item) => item.status === 'ongoing');
        setOngoingTask(ongoing);
      }
    } catch (error) {
      console.log("getTotalBookings error:", error);
    }
  };

  const getJobCompleted = async () => {
    try {
      const res = await axiosInstance(`/booking/getAllCompletedBookings/${user?._id}`);
      if (res) {
        setJobCompletedLength(res?.data.data?.length);
        setJobCompleted(res?.data?.data);
      }
    } catch (error) {
      console.log("jobCompleted error:", error);
    }
  };

  const getTotalEarned = async () => {
    try {
      const res = await axiosInstance(`/booking/getAllEarnedMoney/${user?._id}`);
      if (res) {
        setTotalEarned(res?.data?.data.totalMoney);
      }
    } catch (error) {
      console.log("gettotalEarned error:", error);
    }
  };

  const getUnacceptedBookings = async () => {
    try {
      const res = await axiosInstance.get("/booking/unaccepted");
      if (res) {
        setUnacceptedBookings(res.data.data);
      }
    } catch (error) {
      console.log("getUnacceptedBookings error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        getTotalBookings(),
        getJobCompleted(),
        getTotalEarned(),
        getUnacceptedBookings(),
      ]);
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchData();
  }, []);

  return (
    <div className='p-4 text-white max-h-screen main' style={{ overflowY: "scroll" }}>
      <div className='flex flex-wrap justify-around gap-4'>
        {/* Total Booking Card */}
        <div className='backdrop-blur-md bg-white/10 text-white p-4 rounded-lg shadow-md max-w-[250px] flex-1'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className='flex items-center'>
              <div className='w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mr-4'>
                <FaCalendarCheck />
              </div>
              <div>
                <h2 className='text-lg font-semibold'>Total Booking</h2>
                <p className='text-sm'>{totalBookings}</p>
              </div>
            </div>
          )}
        </div>

        {/* Jobs Completed Card */}
        <div className='backdrop-blur-md bg-white/10 text-white p-4 rounded-lg shadow-md max-w-[250px] flex-1'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className='flex items-center'>
              <div className='w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white mr-4'>
                <FaCheckCircle />
              </div>
              <div>
                <h2 className='text-lg font-semibold'>Jobs Completed</h2>
                <p className='text-sm'>{jobCompletedLength}</p>
              </div>
            </div>
          )}
        </div>

        {/* Total Earning Card */}
        <div className='backdrop-blur-md bg-white/10 text-white p-4 rounded-lg shadow-md max-w-[250px] flex-1'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className='flex items-center'>
              <div className='w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white mr-4'>
                <FaDollarSign />
              </div>
              <div>
                <h2 className='text-lg font-semibold'>Total Earning</h2>
                <p className='text-sm'>INR {totalEarned}</p>
              </div>
            </div>
          )}
        </div>

        {/* Rating Card */}
        <div className='backdrop-blur-md bg-white/10 text-white p-4 rounded-lg shadow-md max-w-[250px] flex-1'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className='flex items-center'>
              <div className='w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white mr-4'>
                <FaStar />
              </div>
              <div>
                <h2 className='text-lg font-semibold'>Rating</h2>
                <p className='text-sm'>{rating || 0}/5</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='my-4'>
        <h2 className='font-semibold text-2xl'>All Slots</h2>
        <div className='flex flex-wrap justify-around gap-4 my-4'>
          {/* Completed Jobs Slot */}
          <div className='scroll backdrop-blur-md bg-white/10 min-w-[300px] text-white p-4 rounded-lg shadow-md flex-1 max-w-[400px] h-64 overflow-y-auto'>
            <div className='text-lg font-semibold mb-2'>Completed Jobs</div>
            <div className='text-sm'>
              {loading ? (
                <p>Loading...</p>
              ) : (
                jobCompleted.map((job) => (
                  <div key={job._id}>
                    <CompletedJob payment={job?.payment} clientName={job?.user?.name} location={job?.user?.city} />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Ongoing Jobs Slot */}
          <div className='backdrop-blur-md bg-white/10 text-white p-4 min-w-[300px] rounded-lg shadow-md flex-1 max-w-[400px] h-64'>
            <div className='text-lg font-semibold mb-2'>Ongoing Job</div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              ongoingTask && ongoingTask.length > 0 ? (
                <OngoingJob clientName={ongoingTask[0]?.user.name} description={ongoingTask[0]?.description} price={ongoingTask[0].price} timeSlot={ongoingTask[0].timeSlot} />
              ) : (
                <div className='w-[100%] h-[100%] flex justify-center items-center font-semibold text-2xl'>
                  No Ongoing task
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className='my-8'>
        <h2 className='my-6 font-semibold text-2xl'>New Job Notification</h2>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            unacceptedBookings.map((booking) => (
              <div key={booking._id}>
                <BookingOffers clientImage={booking.user?.pfp} clientName={booking.user?.name} timeSlot={booking.timeSlot} bookingId={booking._id} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
