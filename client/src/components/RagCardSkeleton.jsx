import React from 'react';

const RagCardSkeleton = () => (
  <div className="w-full block h-min rounded-2xl backdrop-blur-xl bg-white/5 border-2 border-white/20 shadow-2xl animate-pulse">
    <div className="flex justify-end px-2 pt-2">
      <button className="inline-block bg-white/5 rounded-lg text-sm p-1.5" disabled>
        <span className="sr-only">Loading...</span>
        <svg className="w-5 h-5 animate-pulse" viewBox="0 0 16 3">
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
      </button>
    </div>
    <div className="flex flex-col items-center pb-10 font-bold">
      <div className="w-32 h-32 mb-3 rounded-full bg-gray-300"></div>
      <div className="h-6 bg-gray-300 w-3/4 mb-2 rounded"></div>
      <div className="flex flex-col p-2 gap-1 items-start">
        <div className="h-4 bg-gray-300 w-1/2 mb-2 rounded"></div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-300 me-1 rounded-full"></div>
          <div className="h-4 bg-gray-300 w-1/3 rounded"></div>
          <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full" />
          <div className="h-4 bg-gray-300 w-1/4 rounded"></div>
        </div>
        <div className="h-4 bg-gray-300 w-1/2 rounded"></div>
      </div>
      <div className="flex mt-4 md:mt-6">
      </div>
    </div>
  </div>
);

export default RagCardSkeleton;
