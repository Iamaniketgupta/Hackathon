import React from 'react';
import { FaDollarSign, FaMapMarkerAlt } from 'react-icons/fa';

const HistoryBox = ({ 
  userImage, 
  userName = "John Doe", 
  userEmail = "john@example.com", 
  location = "City, Country", 
  ongoing = false, 
  paymentAmount = "1000", 
  isCancelled = false 
}) => {
  const paymentStatus = isCancelled ? "unpaid" : ongoing ? "unpaid" : "paid";

  return (
    <div className='backdrop-blur-md bg-black/20 text-white p-4 rounded-lg shadow-lg flex flex-col sm:flex-row justify-between items-center mb-4 max-w-2xl transition-transform hover:scale-105 gap-4 border border-white/20'>
      <div className='flex items-center mb-2 md:mb-0'>
        <img src={userImage} alt={userName} className='w-14 h-14 rounded-full border-2 border-blue-500 mr-3 shadow-md' />
        <div className='flex flex-col'>
          <p className='text-lg font-semibold'>{userName}</p>
          <p className='text-sm text-gray-300'>{userEmail}</p>
          <p className='text-sm text-gray-300 flex items-center'>
            <FaMapMarkerAlt className='mr-1' /> {location}
          </p>
        </div>
      </div>
      <div className='flex items-center gap-4 mt-2 md:mt-0'>
        {isCancelled ? (
          <span className='text-sm text-red-500 font-semibold'>Cancelled</span>
        ) : ongoing ? (
          <span className='text-sm text-yellow-400 font-semibold'>Ongoing</span>
        ) : (
          <span className='text-sm text-gray-400 font-semibold'>Completed</span>
        )}
        {paymentStatus === "paid" ? (
          <p className='ml-4 text-sm text-green-400 flex items-center'>
            <FaDollarSign className='inline mr-1' /> Paid: {paymentAmount} INR
          </p>
        ) : (
          <span className='text-sm text-red-400 font-semibold'>Not paid yet</span>
        )}
      </div>
    </div>
  );
};

export default HistoryBox;
