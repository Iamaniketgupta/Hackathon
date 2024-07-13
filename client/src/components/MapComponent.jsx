import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
=======
import { MapContainer, TileLayer, Polyline, Marker, Popup,Tooltip } from 'react-leaflet';
>>>>>>> 0eb91b73dba9fbff412b14e498dcf9daf0323eb2
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getDistance } from 'geolib';

// Fix the default icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

<<<<<<< HEAD
const MapComponent = ({ position2 }) => {
  const [position1, setPosition1] = useState(null);
  const polyline = position1 ? [position1, position2] : [];
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    // Get current location
=======

const MapComponent = ({ position2=[30.94, 75.88644] }) => {
  const [position1, setPosition1] = useState(null);
  const polyline = position1 ? [position1, position2] : [];
  const [distance, setDistance] = useState(null);
  useEffect(() => {
>>>>>>> 0eb91b73dba9fbff412b14e498dcf9daf0323eb2
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPosition1([latitude, longitude]);
      },
      (error) => {
        console.error("Error getting location:", error);
<<<<<<< HEAD
        setPosition1([30.938368, 75.8864447]);
      }
    );
=======
        setPosition1([33.938368, 75.8864447]);
      }
    );
    console.log(position1);
>>>>>>> 0eb91b73dba9fbff412b14e498dcf9daf0323eb2
  }, []);

  useEffect(() => {
    if (position1 && position2) {
      const dist = getDistance(
        { latitude: position1[0], longitude: position1[1] },
        { latitude: position2[0], longitude: position2[1] }
      );
      setDistance(dist);
    }
  }, [position1, position2]);

  const formattedDistance = distance 
    ? distance < 1000 
      ? `${distance} meters` 
      : `${(distance / 1000).toFixed(2)} kilometers`
    : '';

  return (
    <div className="mt-10 w-full">
      {position1 && (
        <>
         {formattedDistance && (
            <div className="mt-4 text-center">
              <h2>Distance: {formattedDistance} away</h2>
            </div>
          )}
<<<<<<< HEAD
          <MapContainer center={position1} zoom={15} className='w-full h-[300px] mt-10'>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position1} icon={L.divIcon({ className: 'marker-start' })}>
              <Popup>
                You
              </Popup>
            </Marker>
            <Marker position={position2} icon={L.divIcon({ className: 'marker-end' })}>
              <Popup>
                Ragpicker
              </Popup>
            </Marker>
            <Polyline positions={polyline} color="blue" />
=======
          <MapContainer center={position1} zoom={16} className='w-full h-[400px] mt-10'>
            <TileLayer
              url="http://mt1.google.com/vt?lyrs=m&x={x}&y={y}&z={z}"
            />
            <Marker position={position1} >
            <Tooltip direction="bottom" offset={[-15, 25]} opacity={1} permanent>
              You
           </Tooltip>
            </Marker>
            <Marker position={position2} >
            <Tooltip direction="bottom" offset={[-15, 25]} opacity={1} permanent>
              Ragpicker
           </Tooltip>
            </Marker>
            <Polyline positions={polyline} color="#0f53ff" />
>>>>>>> 0eb91b73dba9fbff412b14e498dcf9daf0323eb2
          </MapContainer>
         
        </>
      )}
    </div>
  );
};

<<<<<<< HEAD
// Default props for position2
MapComponent.defaultProps = {
  position2: [30.938383, 75.88644],
};
=======
>>>>>>> 0eb91b73dba9fbff412b14e498dcf9daf0323eb2

export default MapComponent;
