import React from 'react';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import './MapDisplay.css'

const MapDisplay = ({ searchLocation }) => {
  React.useEffect(() => {
    // create map
    const mapObj = L.map('mapid', {
      center: [38.033554, -78.507980],
      zoom: 16,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    });
  }, []);

  return <div id="mapid"></div>
}

export default MapDisplay;