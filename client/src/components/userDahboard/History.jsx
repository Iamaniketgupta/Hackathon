import React from 'react';
import HistoryBox from './HistoryBox';

const History = () => {
  return (
    <div className='p-4 mx-auto'>
      <div className='text-3xl font-semibold mb-4 text-center text-white'>
        History
      </div>
      <div className='backdrop-blur-md bg-white/10 p-4 rounded-lg shadow-md max-w-3xl mx-auto'>
        <HistoryBox/>
        <HistoryBox/><HistoryBox/>
        <HistoryBox/>
        <HistoryBox/>
      </div>
    </div>
  );
};

export default History;
