import React, { useEffect, useState } from 'react';
import HistoryBox from './HistoryBox';
import { requestUrl } from '../../../constant';
import axios from 'axios';

const AllBookigs = () => {


  const [booking, setbooking] = useState(null)

  useEffect(() => {
    getB();

  }, []);
  const getB = async () => {
    try {
      const data = await axios.get(`${requestUrl}/users/bookings/all`)
      setbooking(data?.data?.bookings);
      console.log(data)

    } catch (error) {
      console.log(error)
    }
  }
  console.log(booking)


  return (
    <div className='p-4 mx-auto'>
      <div className='text-3xl font-semibold mb-4 text-center text-white'>
        History
      </div>
      <div className='backdrop-blur-md bg-white/10 p-4 rounded-lg shadow-md max-w-3xl mx-auto'>
        {booking?.map((b) =>
          <HistoryBox key={b._id} data={data} />)
        }
      </div>
    </div>
  );
};

export default AllBookigs;
