import './style.css';
import Leaflet from 'leaflet'; // import everything from leaflet
import 'leaflet/dist/leaflet.css'; // import leaflet css

const WBS = [52.457131, 13.54007]; // WBS coordinates
const map = Leaflet.map('map').setView(WBS, 13); // create a map object with a center and zoom level
const markerIcon = Leaflet.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconAnchor: [10, 20],
}); // There was an issue with the default marker icon, so we create a new one
Leaflet.marker(WBS, { icon: markerIcon }).addTo(map); // add a marker to the map at the WBS coordinates

Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://google.com" target="_blank">Google</a>',
}).addTo(map);

console.log(import.meta.env.VITE_API_KEY);
