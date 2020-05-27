import React, { useState } from 'react';

import { Row, Col, Input } from "antd";

import RestaurantDisplay from "./restaurant-display/RestaurantDisplay.js";
import MapDisplay from "./map-display/MapDisplay.js";
import Filter from "./Filter.js";

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
  const [searchLocation, setSearchLocation] = React.useState([0, 0]); //[lat, long]
  const [searchRadius, setSearchRadius] = React.useState(50000); //radius

  const clog = toPrint => {
    console.log(toPrint)
  }

  const axios = require('axios');

  /*.env key hiding not working yet*/
  const GP_API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

  const makePlacesRequest = (searchString) => {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?', {
      params: {
        address: searchString.trim().replace(" ", "+"),
        key: GP_API_KEY,
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

  const getNearByRestaurants = () => {
    axios.get("https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?", {
      params: {
        location: searchLocation[0] + "," + searchLocation[1],
        radius: searchRadius,
        type: "restaurant",
        opennow: true,
        key: GP_API_KEY
      }
    })
      .then(function (response) {
        setAllRestaurants(response.data.results);
        console.log(allRestaurants)
      })
  }

  const handleSelect = async (value) => { }

  return (
    <Row>
      <Col span={2}>
        <Filter />
      </Col>
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