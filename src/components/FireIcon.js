import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { Icon as IconifyIcon } from '@iconify/react';
import fireAlert from '@iconify/icons-mdi/fire-alert';

// Create a custom fire icon for the map
const createFireIcon = () => {
  // Create the SVG icon as a string
  const iconMarkup = renderToStaticMarkup(
    <IconifyIcon icon={fireAlert} style={{ fontSize: '24px', color: 'red' }} />
  );

  // Convert the SVG markup to a data URL
  const iconUrl = `data:image/svg+xml;base64,${btoa(iconMarkup)}`;

  // Create a Leaflet icon
  return L.icon({
    iconUrl,
    iconSize: [24, 24],     // Size of the icon
    iconAnchor: [12, 12],   // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -12]   // Point from which the popup should open relative to the iconAnchor
  });
};

export default createFireIcon;