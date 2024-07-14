import React from 'react';
import { FaDollarSign, FaMapMarkerAlt } from 'react-icons/fa';

const HistoryBox = ({data}) => {
  const paymentStatus = isCancelled ? "unpaid" : ongoing ? "unpaid" : "paid";
console.log(data)
  return (
    <div className='backdrop-blur-md bg-black/20 text-white p-4 rounded-lg shadow-lg flex flex-col sm:flex-row justify-between items-center mb-4 max-w-2xl transition-transform hover:scale-105 gap-4 border border-white/20'>
      <div className='flex items-center mb-2 md:mb-0'>
        {data}
        <img src={data?.ragPicker.pfp} alt={data?.ragPicker?.name} className='w-14 h-14 rounded-full border-2 border-blue-500 mr-3 shadow-md' />
        <div className='flex flex-col'>
          <p className='text-lg font-semibold'>{data?.ragPicker?.name}</p>
          <p className='text-sm text-gray-300'>{data?.ragPicker?.email}</p>
       
        </div>
      </div>
      <div className='flex items-center gap-4 mt-2 md:mt-0'>
        {data?.isAccepted ? (
          <span className='text-sm text-green-500 font-semibold'>Accepted</span>
        ) : ongoing ? (
          <span className='text-sm text-yellow-400 font-semibold'>Requested</span>
        ) :''}

        {data?.isPaid  ? (
          <p className='ml-4 text-sm text-green-400 flex items-center'>
            <FaDollarSign className='inline mr-1' /> Paid: {data?.payment} INR
          </p>
        ) : (
          <span className='text-sm text-red-400 font-semibold'>Not paid yet</span>
        )}
      </div>
    </div>
  );
};

export default HistoryBox;
