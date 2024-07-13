import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const CompletedJob = ({ payment = "890", clientName="suraj", location="ldh" }) => {
  return (
    <div className='backdrop-blur-md bg-white/10 text-white p-4 rounded-lg shadow-lg my-2'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <FaCheckCircle className='text-green-500 w-6 h-6 mr-3' />
          <div className='flex flex-col'>
            <span className='text-sm font-semibold'>{clientName}</span>
            <span className='text-xs text-gray-400'>{location}</span>
          </div>
        </div>
        <span className='text-lg font-bold text-green-400'>{payment} INR</span>
      </div>
    </div>
  );
};

export default CompletedJob;
