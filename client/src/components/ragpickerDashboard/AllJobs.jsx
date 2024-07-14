import React, { useEffect, useState } from 'react';
import Job from './Job';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosInstance from '../../axiosConfig/axiosConfig';

const AllJobs = () => {

  const user = useSelector(state=>state.auth.user);
  const [allBookings, setallBookings] = useState([]);

  const getTotalBookings = async () => {
    try {
      const res = await axiosInstance(`/booking/getAllBookings/${user._id}`);
      console.log("res : " ,res)
      if(res){
        setallBookings(res?.data?.data);
      }
      
    } catch (error) {
      console.log("getTotalBookings error:", error);
    }
  };
  useEffect(() => {
    getTotalBookings()
    
  }, [])

  
  
  

  return (
    <div className='p-4 mx-auto'>
      <div className='text-3xl font-semibold mb-4 text-center text-white'>
        Job History
      </div>
      <div className='backdrop-blur-md bg-white/10 p-4 rounded-lg shadow-md max-w-3xl mx-auto'>
      {
        allBookings.map((booking)=>{
          if(booking.status === 'ongoing' || booking.status === 'completed'){
            return (
            
              <div>
                <Job userImage={booking?.user.pfp} userName={booking.user.username} userEmail={booking.user.email} location={booking.user.address} ongoing={booking.status === 'ongoing'} paymentAmount={booking.payment} isCancelled={booking.status ==='cancelled'} />
              </div>
            )
          }
          
        })
      }
        
      </div>
    </div>
  );
};

export default AllJobs;
