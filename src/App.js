import React, { useState } from "react";

import { Row, Col, Input } from "antd";

import RestaurantDisplay from "./restaurant-display/RestaurantDisplay.js";
import MapDisplay from "./map-display/MapDisplay.js";
import Filter from "./Filter.js";

const { Search } = Input;

function App() {
  const [allRestaurants, setAllRestaurants] = useState([
    //Commented out cuz locations are not coordinates --> Let's have a home page when list in a 0
  ]);
  const [searchLocation, setSearchLocation] = React.useState([0, 0]); //starts at CVille
  const [searchRadius, setSearchRadius] = React.useState(3000); //radius

  const axios = require("axios");

  const GP_API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;


  //sort by rating (high to low)
  const highToLow = arr => {
    let newArray = arr.slice();
    newArray.sort((a, b) => {
      return b.rating - a.rating;
    });
    setAllRestaurants(newArray);
  };

  //sort by rating (low to high)
  const lowToHigh = arr => {
    let newArray = arr.slice();
    newArray.sort((a, b) => {
      return a.rating - b.rating;
    });
    setAllRestaurants(newArray);
  };

  //removes spaces from strings and makes lowercase
  const cleanUp = str => {
    return str.replace(/\s/g, "").toLowerCase();
  };

  //sort by name (a-z)
  const aToZ = arr => {
    let newArray = arr.slice();
    newArray.sort((a, b) => {
      if (cleanUp(a.name) > cleanUp(b.name)) {
        return 1;
      } else if (cleanUp(a.name) < cleanUp(b.name)) {
        return -1;
      } else {
        return 0;
      }
    });
    setAllRestaurants(newArray);
  };

  //sort by name (za)
  const zToA = arr => {
    let newArray = arr.slice();
    newArray.sort((a, b) => {
      if (cleanUp(a.name) > cleanUp(b.name)) {
        return 1;
      } else if (cleanUp(a.name) < cleanUp(b.name)) {
        return -1;
      } else {
        return 0;
      }
    });
    newArray.reverse();
    setAllRestaurants(newArray);
  };

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
        //setSearchLocation([38.070591, -78.44631099999]); //hardcode cville location
      })
      .catch(function (error) {
        console.log('ERROR in "makePlacesRequest"');
        console.log(error);
      });

    getNearByRestaurants();
  };

  const getNearByRestaurants = () => {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?",
        {
          params: {
            location: searchLocation[0] + "," + searchLocation[1],
            radius: searchRadius,
            type: "restaurant",
            opennow: true,
            key: GP_API_KEY
          }
        }
      )
      .then(function (response) {
        setAllRestaurants(response.data.results);
        console.log(allRestaurants);
      }).catch(function (error) {
        console.log('ERROR in "getNearByRestaurants"');
        console.log(error);
      });

  };

  return (
    <Row>
      <Col span={2}>
        <Filter
          allRestaurants={allRestaurants}
          highToLow={highToLow}
          lowToHigh={lowToHigh}
          aToZ={aToZ}
          zToA={zToA}
          cleanup={cleanUp}
        />
      </Col>
      <Col span={10}>
        <Search
          placeholder="input search text"
          size="large"
          id="userSearch"
          onSearch={searchString => {
            makePlacesRequest(searchString);
          }}
          enterButton
        />
        <RestaurantDisplay allRestaurants={allRestaurants} />
      </Col>
      <Col span={12}>
        <MapDisplay allRestaurants={allRestaurants} searchLocation={searchLocation} />
      </Col>
    </Row>
  );
}

export default App;
