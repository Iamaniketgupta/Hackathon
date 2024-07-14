import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function RagCard({data}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // useEffect(() => {
  //   window.onclick = () => {
  //     isMobileMenuOpen(false);
  //   };
  // }, []);


  return (
    <div className="w-full block h-min rounded-2xl backdrop-blur-xl bg-white/5  focus:ring-gray-200 border-2 border-white/20 shadow-2xl  hover:bg-white/10 " onClick={() => { setIsMobileMenuOpen(false) }}
    >
      <div className="flex justify-end px-2 pt-2">
        <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          className="inline-block bg-white/5  focus:ring-4 focus:outline-none focus:ring-gray-200  rounded-lg text-sm p-1.5"
          type="button"
          onClick={(e) => { setIsMobileMenuOpen(!isMobileMenuOpen); e.stopPropagation(); }}
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
          isMobileMenuOpen && <div
            id="dropdown"
            className="z-10 text-base absolute backdrop-blur-xl bg-black/50 mt-10 list-none divide-y divide-gray-100 rounded-lg shadow w-44"
            onClick={() => { setIsMobileMenuOpen(false) }}
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
        <h5 className="mb-1 text-2xl font-medium  dark:text-white">
          {data?.name}
        </h5>
        <div className='flex flex-col p-2 gap-1 items-start'>
          <span className="text-md text-white/90">
            Charges: Rs100/hr
          </span>
          <span className="text-md text-white/90">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-yellow-300 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <p className="ms-2 text-sm font-bold  ">4.95</p>
              <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full " />
              <a
                href="#"
                className="text-sm font-medium text-gray-900 dark:text-white"
              >
                73 reviews
              </a>
            </div>
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