
import { DrcRegions } from './types';

// Define DRC region boundaries and polygons with detailed information
export const drcRegions: DrcRegions = {
  whole: {
    center: [-2.8767, 23.6345],
    zoom: 5,
    label: "Democratic Republic of Congo",
    polygon: [
      [12.5, -5.0], [13.5, -4.5], [15.0, -4.0], [17.0, -3.5], 
      [18.5, -3.5], [20.0, -4.0], [22.0, -5.0], [24.0, -5.0],
      [25.0, -6.5], [26.0, -7.0], [27.0, -8.0], [28.5, -8.5],
      [29.5, -10.5], [29.0, -12.0], [27.0, -12.5], [25.0, -12.0],
      [22.0, -13.0], [20.0, -11.5], [18.5, -11.0], [17.0, -10.5],
      [15.0, -9.0], [13.0, -6.0], [12.5, -5.0]
    ],
    funding: 345000000,
    programs: ['DRC M300 Compact', 'Green Mini-Grid Development Program', 'SNEL Infrastructure Rehabilitation Project'],
    connections: 760000
  },
  north: {
    center: [0.5, 25],
    zoom: 6,
    label: "North DRC",
    polygon: [
      [18.0, 2.0], [22.0, 2.0], [25.0, 2.0], [29.0, 1.0],
      [29.0, -1.0], [26.0, -2.0], [23.0, -2.0], [20.0, -2.0],
      [18.0, -1.0], [16.0, 0.0], [18.0, 2.0]
    ],
    funding: 85000000,
    programs: ['DRC M300 Compact', 'Green Mini-Grid Development Program'],
    connections: 150000
  },
  south: {
    center: [-9, 24],
    zoom: 6,
    label: "South DRC",
    polygon: [
      [22.0, -5.0], [25.0, -5.0], [28.0, -6.0], [29.0, -8.0],
      [28.0, -10.0], [26.0, -12.0], [23.0, -13.0], [20.0, -11.0],
      [22.0, -7.0], [22.0, -5.0]
    ],
    funding: 120000000,
    programs: ['DRC M300 Compact', 'SNEL Infrastructure Rehabilitation Project'],
    connections: 270000
  },
  east: {
    center: [-2.5, 28],
    zoom: 6,
    label: "East DRC",
    polygon: [
      [26.0, -1.0], [29.5, -1.0], [30.0, -2.0], [30.0, -5.0],
      [29.0, -8.0], [28.0, -6.0], [26.0, -4.0], [26.0, -1.0]
    ],
    funding: 75000000,
    programs: ['DRC M300 Compact', 'Green Mini-Grid Development Program'],
    connections: 210000
  },
  west: {
    center: [-4, 17],
    zoom: 6,
    label: "West DRC",
    polygon: [
      [12.5, -5.0], [14.0, -3.0], [16.0, -2.0], [18.0, -2.0],
      [20.0, -2.0], [22.0, -3.0], [22.0, -5.0], [20.0, -7.0],
      [18.0, -9.0], [16.0, -8.0], [14.0, -6.0], [12.5, -5.0]
    ],
    funding: 65000000,
    programs: ['SNEL Infrastructure Rehabilitation Project'],
    connections: 130000
  }
};

// Fix Leaflet marker icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

// Initialize the default icon
export const initializeLeafletIcons = () => {
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  L.Marker.prototype.options.icon = DefaultIcon;
};

// Map tile style URLs
export const mapTileStyles = {
  openStreetMap: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  light: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
  dark: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
  satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  detailed: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png'
};
