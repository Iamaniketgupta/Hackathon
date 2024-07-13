import React, { useEffect } from 'react';
import { FaCalendarCheck, FaCheckCircle, FaDollarSign, FaStar } from 'react-icons/fa';
import CompletedJob from './CompletedJob';
import OngoingJob from './OngoingJob';
import BookingOffers from './BookingOFfers';
import "./style.css"
import { useSelector } from 'react-redux';
import axiosInstance from '../../axiosConfig/axiosConfig';

const Dashboard = () => {

  const getRagpicker = async()=>{
    try {
      const response =await  axiosInstance.get("/rp/get")
      console.log("Response L " , response);
    } catch (error) {
      console.log("error : " , error)
    }
  }

  useEffect(()=>{
    getRagpicker();
  },[])
    
  return (
    <div className='p-4 text-white'>
      <div className='flex flex-wrap justify-around gap-4'>
        {/* Total Booking Card */}
        <div className='backdrop-blur-md bg-white/10 text-white p-4 rounded-lg shadow-md max-w-[250px] flex-1'>
          <div className='flex items-center'>
            <div className='w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mr-4'>
              <FaCalendarCheck />
            </div>
            <div>
              <h2 className='text-lg font-semibold'>Total Booking</h2>
              <p className='text-sm'>150</p>
            </div>
          </div>
        </div>

        {/* Jobs Completed Card */}
        <div className='backdrop-blur-md bg-white/10 text-white p-4 rounded-lg shadow-md max-w-[250px] flex-1'>
          <div className='flex items-center'>
            <div className='w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white mr-4'>
              <FaCheckCircle />
            </div>
            <div>
              <h2 className='text-lg font-semibold'>Jobs Completed</h2>
              <p className='text-sm'>120</p>
            </div>
          </div>
        </div>

        {/* Total Earning Card */}
        <div className='backdrop-blur-md bg-white/10 text-white p-4 rounded-lg shadow-md max-w-[250px] flex-1'>
          <div className='flex items-center'>
            <div className='w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white mr-4'>
              <FaDollarSign />
            </div>
            <div>
              <h2 className='text-lg font-semibold'>Total Earning</h2>
              <p className='text-sm'>INR 12,500</p>
            </div>
          </div>
        </div>

        {/* Rating Card */}
        <div className='backdrop-blur-md bg-white/10 text-white p-4 rounded-lg shadow-md max-w-[250px] flex-1'>
          <div className='flex items-center'>
            <div className='w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white mr-4'>
              <FaStar />
            </div>
            <div>
              <h2 className='text-lg font-semibold'>Rating</h2>
              <p className='text-sm'>4.8/5</p>
            </div>
          </div>
        </div>
      </div>

      <div className='my-4'>
        <h2 className='font-semibold text-2xl'>All Slots</h2>
        <div className='flex flex-wrap justify-around  gap-4 my-4'>
          {/* First Slot */}
          <div className=' scroll backdrop-blur-md bg-white/10 min-w-[300px]  text-white p-4 rounded-lg shadow-md flex-1 max-w-[400px] h-64 overflow-y-auto'>
            <div className='text-lg font-semibold mb-2'>Completed Jobs</div>
            <div className='text-sm'>
                <CompletedJob/>
                <CompletedJob/>
                <CompletedJob/>
                <CompletedJob/>
                <CompletedJob/>
                <CompletedJob/>
                <CompletedJob/>
                <CompletedJob/>
                <CompletedJob/>
                <CompletedJob/>
                <CompletedJob/>
            </div>
          </div>

          {/* Second Slot */}
          <div className='backdrop-blur-md bg-white/10 text-white p-4 min-w-[300px]  rounded-lg shadow-md flex-1 max-w-[400px] h-64'>
            <div className='text-lg font-semibold mb-2'>Ongoing Job</div>
            <OngoingJob/>
          </div>
        </div>
      </div>

      <div className='my-8'>
        
      <h2 className='my-6 font-semibold text-2xl'>New Job Notification</h2>
      <div>
        
      <BookingOffers/>
      <BookingOffers/>
      <BookingOffers/>
      <BookingOffers/>
      <BookingOffers/>

      </div>


      </div>
    </div>
  );
}

export default Dashboard;
