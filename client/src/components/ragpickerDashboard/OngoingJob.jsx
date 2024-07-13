import React from 'react';
import { FaUser, FaInfoCircle, FaDollarSign } from 'react-icons/fa';

const OngoingJob = ({ 
  timeSlot = "7 - 9 PM", 
  clientName = "Suraj", 
  description = "Hai kuch abhi chhod de", 
  price = "890", 
  clientImage 
}) => {
  return (
    <div className='backdrop-blur-md bg-white/10 text-white p-4 rounded-lg shadow-lg w-[90%] h-[80%] mx-auto flex flex-col justify-between'>
      <div className='flex justify-between items-start'>
        <div className='flex items-center'>
          <img src={clientImage} alt={clientName} className='w-10 h-10 rounded-full mr-2' />
          <p className='text-sm font-medium'>{clientName}</p>
        </div>
        <div className='text-xl font-bold text-green-400'>
        <span className='text-xl font-bold text-green-400'>
  ₹ {price}
</span>
        </div>
      </div>

      <div className='flex-grow my-2 overflow-auto'>
        <div className='flex items-center mb-2'>
          <FaInfoCircle className='text-yellow-400 w-5 h-5 mr-2' />
          <p className='text-sm text-gray-300'>{description}</p>
        </div>
      </div>

      <div className='flex justify-between items-center'>
        <p className='text-sm font-bold'>Time Slot:</p>
        <p className='text-sm font-bold bg-green-600 text-white py-1 px-2 rounded'>{timeSlot}</p>
      </div>
    </div>
  );
};

export default OngoingJob;
