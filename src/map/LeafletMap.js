import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useState } from 'react';
import LocationInfoBox from '../components/LocationInfoBox';
import fireIconUrl from '../assets/fire.png';
import droughtIconUrl from '../assets/drought.png'
import earthquakeIconUrl from '../assets/earthquake.png'
import floodIconUrl from '../assets/flood.png'
import stormIconUrl from '../assets/storm.png'
import volcanoIconUrl from '../assets/volcano.png'
import '../index.css';

const categoryIcons = {
  '8': fireIconUrl,
  '10': volcanoIconUrl,
  '12': stormIconUrl,
  '15': earthquakeIconUrl,
  '6': droughtIconUrl,
  '16': floodIconUrl,
};

const getIconForCategory = (categoryId) => {
  const iconUrl = categoryIcons[categoryId] || fireIconUrl;
  return new L.Icon({
    iconUrl,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
};

const LeafletMap = ({ events }) => {
  const [selected, setSelected] = useState(null);

  const bounds = events.map(ev => {
    const [lng, lat] = ev.geometries[0].coordinates;
    return [lat, lng];
  });

  return (
    <div className="map-container">
      <MapContainer bounds={bounds} scrollWheelZoom={true} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {events.map((ev, index) => {
          const [lng, lat] = ev.geometries[0].coordinates;
          const categoryId = ev.categories[0].id.toString();
          const icon = getIconForCategory(categoryId);

          return (
            <Marker
              key={index}
              position={[lat, lng]}
              icon={icon}
              eventHandlers={{
                click: () => {
                  setSelected({
                    id: ev.id,
                    title: ev.title,
                    date: ev.geometries[0].date,
                    link: `https://eonet.gsfc.nasa.gov/api/v2.1/events/${ev.id}`,
                  });
                },
              }}
            >
              <Popup>
                <h3>{ev.title}</h3>
                <p>ID: {ev.id}</p>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      {selected && <LocationInfoBox info={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

export default LeafletMap;