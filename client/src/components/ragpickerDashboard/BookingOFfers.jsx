import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import axiosInstance from '../../axiosConfig/axiosConfig';

const BookingOffers = ({ clientName = "Suraj", clientImage, timeSlot = "7 to 9 PM" , bookingId}) => {
  const [accepted, setaccepted] = useState(false);
  const accept = async(e)=>{
    e.stopPropagation();
    console.log("first")
    try {
      const resp = await axiosInstance.post("/booking/accept" , {
        bookingId
      });
      console.log("res : " , resp);
      if(resp.success){
        setaccepted(true);
      }
      
    } catch (error) {
      console.log("error : ",error);
    }
  }

  const reject = async(e)=>{
    
    e.stopPropagation();
    console.log("first")
    try {
      const resp = await axiosInstance.post("/booking/cancel" , {
        bookingId
      });
      console.log("res : " , resp);
      if(resp.success){
        setaccepted(true);
      }
      
    } catch (error) {
      console.log("error : ",error);
    }
  }

  

  
  return (
    <div className={`backdrop-blur-md bg-white/10 text-white p-4 rounded-lg shadow-md flex justify-between items-center mb-4 transition-transform transform hover:scale-105  ${accepted ? "hidden" : ""} `}  >
      <div className='flex items-center'>
        <img src={clientImage} alt={clientName} className='w-12 h-12 rounded-full mr-3' />
        <div className='flex flex-col'>
          <p className='text-sm font-medium'>{clientName}</p>
          <p className='text-xs text-gray-300'>{timeSlot}</p>
        </div>
      </div>
      <div className='flex flex-col md:flex-row items-center z-30'>
        <button className='bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded flex items-center mb-2 md:mb-0 md:mr-2 transition-colors text-xs'>
          <FaCheckCircle className='mr-1' onClick={accept} /> Accept
        </button>
        <button className='bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded flex items-center transition-colors text-xs'>
          <FaTimesCircle className='mr-1' /> Reject
        </button>
      </div>
    </div>
  );
};

export default BookingOffers;
