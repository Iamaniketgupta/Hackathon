import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Background from '../components/Background';
import RagCard from '../components/RagCard';
import { FaMapMarkedAlt } from "react-icons/fa";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import ListingMap from '../Maps/ListingMap';

import { requestUrl } from '../../constant';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getDistance } from 'geolib';
import RagCardSkeleton from '../components/RagCardSkeleton';

function Listing() {
  const [isGridView, setIsGridView] = useState(true);
  const [loading, setLoading] = useState(false);
  const [ragPickers, setAllRagPickers] = useState(null);
  const [sortedRagPickers, setSortedRagPickers] = useState(null);
  const [sortBy, setSortBy] = useState('');

  const toggleView = () => {
    setIsGridView(prev => !prev);
  };

  useEffect(() => {
    getAllRagPickers();
  }, []);

  useEffect(() => {
    if (sortBy && ragPickers) {
      sortRagPickers(sortBy);
    } else {
      setSortedRagPickers(ragPickers);
    }
  }, [sortBy, ragPickers]);

  const getAllRagPickers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${requestUrl}/users/rp/all`);
      const ragpickersWithDistance = await Promise.all(res.data.ragpickers.map(async (picker) => {
        if (picker.lat && picker.long) {
          const distance = await calculateDistance(picker.lat, picker.long);
          return { ...picker, distance };
        }
        return { ...picker, distance: Infinity }; // Assign Infinity if no coordinates
      }));
      setAllRagPickers(ragpickersWithDistance);
      setLoading(false);
    } catch (error) {
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  const calculateDistance = (lat, long) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const distance = getDistance(
            { latitude, longitude },
            { latitude: lat, longitude: long }
          );
          resolve(distance);
        },
        (error) => {
          console.error("Error getting location:", error);
          resolve(Infinity); // Fallback distance
        }
      );
    });
  };

  const sortRagPickers = (sortBy) => {
    const sortedList = [...(sortedRagPickers || ragPickers)];
    if (sortBy === 'cost') {
      sortedList.sort((a, b) => a.pricePerHour - b.pricePerHour);
    } else if (sortBy === 'ratings') {
      sortedList.sort((a, b) => b.ratings - a.ratings);
    } else if (sortBy === 'distance') {
      sortedList.sort((a, b) => a.distance - b.distance);
    }
    setSortedRagPickers(sortedList);
  };

  return (
    <>

      <Background>
        <Navbar />
        <section className='min-h-screen text-white flex flex-col justify-center items-center mt-20'>
          <h1 className='text-2xl md:text-4xl font-bold tracking-tight text-center mb-10'>
            Book Your RagPickers 🧹
          </h1>
          <div className="px-5 gap-5 mb-10 w-full flex flex-col md:flex-row items-center justify-between">
            <form className="w-full md:max-w-md p-6 bg-white flex-grow bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-md">
              <label htmlFor="sortBy" className="block text-lg mb-4 px-2 font-bold text-white">
                Sort By
              </label>
              <select
                id="sortBy"
                className="w-full p-3 text-gray-300 bg-transparent border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="" hidden>Choose Sort By</option>
                <option value="cost" className='bg-gray-900'>Cost 💰</option>
                <option value="ratings" className='bg-gray-900'>Ratings 🌟</option>
                <option value="distance" className='bg-gray-900'>Distance 🚴‍♂️</option>
                <option value="cost">Cost 💰</option>
                <option value="ratings">Ratings 🌟</option>
                <option value="distance">Distance 🚴‍♂️</option>
              </select>
            </form>
            <div className='flex items-center gap-3 text-2xl mt-5 md:mt-0'>
              <button onClick={toggleView} className={`p-2 rounded-lg ${isGridView ? 'bg-blue-500' : 'bg-transparent'} hover:bg-blue-600 transition`}>
                <BsFillGrid3X3GapFill className={isGridView ? 'text-white' : 'text-gray-300'} />
              </button>
              <button onClick={toggleView} className={`p-2 rounded-lg ${!isGridView ? 'bg-blue-500' : 'bg-transparent'} hover:bg-blue-600 transition`}>
                <FaMapMarkedAlt className={!isGridView ? 'text-white' : 'text-gray-300'} />
              </button>
            </div>
          </div>

          {isGridView ? (
            <div className="flex flex-col md:grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-10 items-center justify-center w-full">
              {loading ? (
                <>
                  <RagCardSkeleton/>
                  <RagCardSkeleton/>
                  <RagCardSkeleton/>
                  <RagCardSkeleton/>
                  <RagCardSkeleton/>
                  <RagCardSkeleton/>
                  </>
                ) : (
                (sortedRagPickers || ragPickers)?.map((item) => (
                    <>
                  <RagCard key={item._id} data={item} />
                  </>
                ))
              )}
            </div>
          ) : (
            <div className="w-full h-[600px]">
              <ListingMap />
            </div>
          )}
        </section>
        <Footer />
      </Background>
    </>
  );
}

export default Listing;
