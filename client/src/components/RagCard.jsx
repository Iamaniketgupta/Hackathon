import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function RagCard({name,charges,rating,distance}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

useEffect(() => {
    window.onclick = () => {
      isMobileMenuOpen(false);
    };
},[]);


  return (
  <div className="w-full block h-min max-w-sm rounded-2xl backdrop-blur-xl bg-white/5  focus:ring-gray-200 border-2 border-white/20 shadow-2xl  hover:bg-white/10 "  onClick={()=>{setIsMobileMenuOpen(false)}}
> 
  <div className="flex justify-end px-2 pt-2">
    <button
      id="dropdownButton"
      data-dropdown-toggle="dropdown"
      className="inline-block bg-white/5  focus:ring-4 focus:outline-none focus:ring-gray-200  rounded-lg text-sm p-1.5"
      type="button"
      onClick={(e)=>{setIsMobileMenuOpen(!isMobileMenuOpen);e.stopPropagation();}}
    >
      <span className="sr-only">Open dropdown</span>
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 3"
      >
        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
      </svg>
    </button>

    {/* Dropdown menu */}
    
   {
  isMobileMenuOpen &&  <div
      id="dropdown"
      className="z-10 text-base absolute backdrop-blur-xl bg-black/50 mt-10 list-none divide-y divide-gray-100 rounded-lg shadow w-44"
      onClick={()=>{setIsMobileMenuOpen(false)}}
    >
      <ul className="py-2" aria-labelledby="dropdownButton">
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-white hover:bg-black/10"
          >
            View Profile
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-white hover:bg-black/10"
          >
            Report
          </a>
        </li>
      </ul>
    </div>
}

  </div>
  <div className="flex flex-col items-center pb-10 font-bold">
    <img
      className="w-32 h-32 mb-3 rounded-full shadow-lg"
      src="https://cdna.artstation.com/p/assets/images/images/014/813/486/large/kailas-matur-rag-picker-1.jpg?1545654474"
      alt="Bonnie image"
    />
    <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white">
      Bonnie Green
    </h5>
    <div className='flex flex-col p-2 gap-1 items-start'>
    <span className="text-md text-white/90">
      Charges: Rs100/hr
    </span>
    <span className="text-md text-white/90">
      Ratings: 4.5⭐
    </span>
    <span className="text-md text-white/90">
      Distance: 2km away
    </span>
    </div>
    <div className="flex mt-4 md:mt-6">
      <Link
        to="/profile"
        className="inline-flex focus:ring-gray-200  items-center text-lg px-4 py-2 font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Book 🧹
      </Link>
    </div>
  </div>
</div>

  )
}

export default RagCard