import React from 'react';
import Job from './Job';

const AllJobs = () => {
  return (
    <div className='p-4 mx-auto'>
      <div className='text-3xl font-semibold mb-4 text-center text-white'>
        Job History
      </div>
      <div className='backdrop-blur-md bg-white/10 p-4 rounded-lg shadow-md max-w-3xl mx-auto'>
        <Job />
        <Job />
        <Job />
        <Job />
        <Job />
      </div>
    </div>
  );
};

export default AllJobs;
