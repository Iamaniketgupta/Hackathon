import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { IoMdLocate } from "react-icons/io";
import iconImg from '../assets/icon.png';
import { useSelector } from 'react-redux';
import axiosInstance from '../axiosConfig/axiosConfig';
import { requestUrl } from '../../constant';
import axios from 'axios';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const userIcon = new L.Icon({
  iconUrl: iconImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const LiveMap = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [error, setError] = useState(null);
  const mapRef = useRef();
  const type = useSelector((state) => state.auth.type);
  
  const fetchIpLocation = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      setUserPosition([data.latitude, data.longitude]);
      setError(null);
    } catch (err) {
      console.error("Error fetching IP location:", err);
      setError("Could not fetch location. Please try again later.");
    }
  };

  const fetchLiveLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition([latitude, longitude]);
        await axios.post(`${requestUrl}/${type!=='ragpicker'?'user':'rp'}/update-coordinates`, { lat: userPosition.latitude, lon: userPosition.longitude })
        setError(null);

      },
      (error) => {
        console.error("Error getting location:", error);
        fetchIpLocation();
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  useEffect(() => {
    fetchLiveLocation();
  }, []);

  useEffect(() => {
    if (userPosition && mapRef.current) {
      const map = mapRef.current;
      map.flyTo(userPosition, 16, {
        animate: true,
        duration: 4
      });
    }
  }, [userPosition]);

  return (
    <div className=" w-full h-full rounded-xl relative ">
      {userPosition && (
        <MapContainer
          center={userPosition}
          zoom={10}
          className="w-full h-full rounded-xl"
          ref={mapRef}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Map View">
              <TileLayer
                url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Satellite View">
              <TileLayer
                url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
              />
            </LayersControl.BaseLayer>
          </LayersControl>

          <Marker position={userPosition} icon={userIcon}>
            <Popup>
              You
            </Popup>
          </Marker>
        </MapContainer>
      )}

      {error && (
        <div className="absolute z-[1000] top-0 left-0 right-0 bg-red-500 text-white p-2 text-center">
          {error}
        </div>
      )}

      <button
        onClick={fetchLiveLocation}
        className="absolute top-24 left-3 md:left-3 z-[500] bg-blue-500 text-white p-2 rounded shadow-lg"
      >
        <IoMdLocate size={25} />
      </button>
    </div>
  );
};

export default LiveMap;
