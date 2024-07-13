import React, { useState } from 'react';

const StarRating = ({rating,setRating}) => {
  const maxStars = 5;
  const handleStarClick = (index) => {
    setRating(index + 1); // Set rating based on clicked star index
  };

  return (
    <div className="flex items-center my-2">
      {[...Array(maxStars)].map((_, index) => {
        const isFilled = index < rating;
        return (
          <svg
            key={index}
            onClick={() => handleStarClick(index)}
            className={`w-8 h-8 ms-1 cursor-pointer ${isFilled ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        );
      })}
      <span className="ml-2 text-white">{rating} Star{rating !== 1 ? 's' : ''}</span>
    </div>
  );
};

export default StarRating;
