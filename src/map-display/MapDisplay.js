import React from 'react';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import './MapDisplay.css';

import { RESTAURANTS } from "../restaurant-display/allRestaurants.js";

const MapDisplay = ({ allRestaurants }) => {
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

    // var markerIcon = L.icon({
    //   iconUrl: require('leaflet/dist/images/marker-icon.png'),
    //   iconSize: [20, 40],
    //   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    //   shadowSize: [10, 20],
    // });
    // var marker = L.marker([38.033554, -78.507980],
    //   { icon: markerIcon })
    //   .addTo(mapObj);
    // marker.bindPopup("<p>Hello, world</p>").openPopup();

    var markerIcon = L.icon({
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      iconSize: [20, 40],
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
      shadowSize: [10, 20],
    });

    //list of hard coded restaurants (TO BE DELETED)!!!!!!!!!!!
    let restaurants = RESTAURANTS[0].results;
    //loop thro each restaurant and make a popUp for each
    for (let i = 0; i < restaurants.length; i++) {
      let restaurant = restaurants[i]
      let geometry = restaurant.geometry.location;
      let lat = geometry.lat;
      let long = geometry.lng;
      var marker = L.marker([lat, long],
        { icon: markerIcon })
        .addTo(mapObj);
      let name = restaurants.name
      console.log(name)
      marker.bindPopup("<p>" + name + "</p>").openPopup();
    }
  }, []);

  return <div id="mapid"></div>
}

export default MapDisplay;