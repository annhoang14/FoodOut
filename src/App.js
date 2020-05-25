import React, { useState, useEffect } from 'react';

import { Row, Col, Input } from "antd";

import RestaurantDisplay from "./RestaurantDisplay.js";
import MapDisplay from "./MapDisplay.js";

import { googlePlacesKey } from "./APIKey.js";

const { Search } = Input;

function App() {
  const [allRestaurants, setAllRestaurants] = useState([
    {
      name: "Fake Restaurant",
      type: "bar",
      isOpen: false,
      location: "10000 Some Rd, Charlottesville, Va 22903",
      rating: 5,
      price: "$$$$$",
      id: 0
    },
    {
      name: "Silk Thai",
      type: "restaurant",
      isOpen: true,
      location: "11010 Sudley Manor Dr, Manassas, VA 20109",
      rating: 3.8,
      price: "$$",
      id: 1
    },
    {
      name: "Real Restaurant",
      type: "buffet",
      isOpen: true,
      location: "100 Totally Real St, Charlottesville, VA, 22903",
      rating: 1.0,
      price: '$',
      id: 2
    },
  ]);
  const [searchLocation, setSearchLocation] = React.useState([0,0]); //[lat, long]
  const [searchRadius, setSearchRadius] = React.useState(50000); //radius

  const clog = toPrint => {
    console.log(toPrint)
  } 
  
  const axios = require('axios');

  const makePlacesRequest = (searchString) => {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?', {
      params: {
        address: searchString.trim().replace(" ", "+"),
        key: googlePlacesKey,
      }
    })
    .then(function (response) {
      /*The 0 may need to change depending on how the API returns this array*/
      const loc = response.data.results[0].geometry.location;
      setSearchLocation([loc.lat, loc.lng]);
    })
    .catch(function (error) {
      console.log("ERROR in \"makePlacesRequest\"")
      console.log(error);
    })

    getNearByRestaurants();
  }

  
  // var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
  // function doCORSRequest(options, printResult) {
  //   var x = new XMLHttpRequest();
  //   x.open(options.method, cors_api_url + options.url);
  //   x.onload = x.onerror = function() {
  //     printResult(
  //       options.method + ' ' + options.url + '\n' +
  //       x.status + ' ' + x.statusText + '\n\n' +
  //       (x.responseText || '')
  //     );
  //   };
  //   if (/^POST/i.test(options.method)) {
  //     x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  //   }
  //   x.send(options.data);
  // }

  // // Bind event
  // (function() {
  //   var urlField = document.getElementById('url');
  //   var dataField = document.getElementById('data');
  //   var outputField = document.getElementById('output');
  //   document.getElementById('get').onclick =
  //   document.getElementById('post').onclick = function(e) {
  //     e.preventDefault();
  //     doCORSRequest({
  //       method: this.id === 'post' ? 'POST' : 'GET',
  //       url: urlField.value,
  //       data: dataField.value
  //     }, function printResult(result) {
  //       outputField.value = result;
  //     });
  //   };
  // })();
  // if (typeof console === 'object') {
  //   console.log('// To test a local CORS Anywhere server, set cors_api_url. For example:');
  //   console.log('cors_api_url = "http://localhost:8080/"');
  // }


  const getNearByRestaurants = () => {
    axios.get( "https://maps.googleapis.com/maps/api/place/nearbysearch/json?", {
      params: {
        location: searchLocation[0] + "," + searchLocation[1],
        radius: searchRadius,
        type: "restaurant",
        opennow: true,
        key: googlePlacesKey
      }
    })
    .then( function( response ) {
      setAllRestaurants( response.data.results );
      console.log( allRestaurants )
    })
  }

  const handleSelect = async (value) => {}

  return (
    <Row>
      <Col span={10}>
        <Search
        placeholder="input search text"
        size="large"
        id="userSearch"
        onSearch={(searchString) => {
          makePlacesRequest(searchString);
        }}
        enterButton
      />
        <RestaurantDisplay allRestaurants={allRestaurants} />
      </Col>
      <Col span={12}>
        <MapDisplay allRestaurants={allRestaurants} />
      </Col>
    </Row>
  )
}

export default App;