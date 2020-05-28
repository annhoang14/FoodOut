import React from 'react';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import './MapDisplay.css';

const MapDisplay = ({ allRestaurants, searchLocation }) => {
  const [mapObj, setMapObj] = React.useState();

  React.useEffect(() => {
    // create map
    setMapObj(L.map('mapid', {
      center: [38.033554, -78.507980], //centered on Cville
      zoom: 16,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    })
    )
  }, []);

  React.useEffect(() => {
    var markerIcon = L.icon({
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      iconSize: [20, 40],
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
      shadowSize: [10, 20],
    });

    //loop thro each nearby restaurant and make a popUp for each
    for (let i = 0; i < allRestaurants.length; i++) {
      let restaurant = allRestaurants[i]
      let geometry = restaurant.geometry.location;
      let lat = geometry.lat;
      let long = geometry.lng;
      var marker = L.marker([lat, long],
        { icon: markerIcon })
        .addTo(mapObj);
      let name = restaurant.name
      marker.bindPopup("<p>" + name + "</p>").openPopup();
    }
  }, [allRestaurants])

  return <div id="mapid"></div>
}

export default MapDisplay;