import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getDistance } from 'geolib';
import iconImg from '../assets/icon.png'
delete L.Icon.Default.prototype._getIconUrl;
import { IoMdLocate } from "react-icons/io";


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

const ragpickerIcon = new L.Icon({
  iconUrl: 'https://www.iconpacks.net/icons/2/free-location-map-icon-2956-thumb.png', 
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const dummyRagpickers = [
  { id: 1, name: 'Ragpicker 1', position: [30.95, 75.88644] },
  { id: 2, name: 'Ragpicker 2', position: [30.94, 75.89644] },
  { id: 3, name: 'Ragpicker 3', position: [30.93, 75.87644] },
  { id: 4, name: 'Ragpicker 4', position: [30.92, 75.88644] },
  { id: 5, name: 'Ragpicker 5', position: [30.91, 75.89644] },
  { id: 6, name: 'Ragpicker 6', position: [30.90, 75.87644] },
  { id: 7, name: 'Ragpicker 7', position: [30.89, 75.88644] },
  { id: 8, name: 'Ragpicker 8', position: [30.88, 75.89644] },
  { id: 9, name: 'Ragpicker 9', position: [30.87, 75.87644] },
  { id: 10, name: 'Ragpicker 10', position: [30.86, 75.88644] },
];

const ListingMap = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [distances, setDistances] = useState([]);
  const [error, setError] = useState(null);
  const mapRef = useRef();

  const fetchLiveLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition([latitude, longitude]);
        setError(null);
      },
      (error) => {
        console.error("Error getting location:", error);
        setError("Kindly turn on the location.");
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

  useEffect(() => {
    if (userPosition) {
      const calculatedDistances = dummyRagpickers.map(ragpicker => {
        const dist = getDistance(
          { latitude: userPosition[0], longitude: userPosition[1] },
          { latitude: ragpicker.position[0], longitude: ragpicker.position[1] }
        );
        return { ...ragpicker, distance: dist };
      });
      setDistances(calculatedDistances);
    }
  }, [userPosition]);

  return (
    <div className="mt-10 w-full h-full rounded-xl relative md:px-5">
      {userPosition && (
        <MapContainer 
          center={userPosition} 
          zoom={7} 
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
            <LayersControl.BaseLayer name="Mapbox View">
              <TileLayer
                url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3BlY3RyYWFkbWluIiwiYSI6ImNsaXI5YTJ5dzAya2IzcW96Nm9ybzkyaHQifQ.Fc5CI-g-UaLVkM1ZTiTzGg"
                id="mapbox/streets-v11"
                tileSize={512}
                zoomOffset={-1}
                accessToken="pk.eyJ1Ijoic3BlY3RyYWFkbWluIiwiYSI6ImNsaXI5YTJ5dzAya2IzcW96Nm9ybzkyaHQifQ.Fc5CI-g-UaLVkM1ZTiTzGg"
              />
            </LayersControl.BaseLayer>
          </LayersControl>

          <Marker position={userPosition} icon={userIcon}>
            <Popup>
              You
            </Popup>
          </Marker>
          {distances.map(ragpicker => (
            <Marker key={ragpicker.id} position={ragpicker.position} icon={ragpickerIcon}>
              <Popup>
                {ragpicker.name} - {ragpicker.distance < 1000 ? `${ragpicker.distance} meters` : `${(ragpicker.distance / 1000).toFixed(2)} kilometers`} away
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
      {error && (
        <div className="absolute z-[1000] top-0 left-0 right-0 bg-red-500 text-white p-2 text-center">
          {error}
        </div>
      )}
      <button
        onClick={fetchLiveLocation}
        className="absolute top-24 nd:left-7 left-3 z-[500] bg-blue-500 text-white p-2 rounded shadow-lg"
      >
       <IoMdLocate size={25} />
      </button>
    </div>
  );
};

export default ListingMap;
