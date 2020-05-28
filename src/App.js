import React, { useState } from "react";

import { Row, Col, Input, Typography } from "antd";

import RestaurantDisplay from "./restaurant-display/RestaurantDisplay.js";
import MapDisplay from "./map-display/MapDisplay.js";
import Filter from "./Filter.js";

import "./App.css"
import dummyData from './dummyCvilleSearch'

const { Title } = Typography;
const { Search } = Input;

function App() {
  const [allRestaurants, setAllRestaurants] = useState([
    {
      name: "Fake Restaurant",
      type: "bar",
      isOpen: false,
      vicinity: "10000 Some Rd, Charlottesville, Va 22903",
      rating: 5,
      price_level: 5,
      id: 0
    },
    {
      name: "Silk Thai",
      type: "restaurant",
      isOpen: true,
      vicinity: "11010 Sudley Manor Dr, Manassas, VA 20109",
      rating: 3.8,
      price_level: 2,
      id: 1
    },
    // {
    //   name: "Real Restaurant",
    //   type: "buffet",
    //   isOpen: true,
    //   vicinity: "100 Totally Real St, Charlottesville, VA, 22903",
    //   rating: 1.0,
    //   price_level: 1,
    //   id: 2
    // }
  ]);

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

  const [searchLocation, setSearchLocation] = React.useState([0, 0]); //[lat, long]
  const [searchRadius, setSearchRadius] = React.useState(50000); //radius

  const axios = require("axios");

  const GP_API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

  const makePlacesRequest = (searchString) => {
    // axios.get('https://maps.googleapis.com/maps/api/geocode/json?', {
    //   params: {
    //     address: searchString.trim().replace(" ", "+"),
    //     key: GP_API_KEY,
    //   }
    // }).then(function (response) {
    //     /*The 0 may need to change depending on how the API returns this array*/
    //     //const loc = response.data.results[0].geometry.location;
    //     //setSearchLocation([loc.lat, loc.lng]);
    setSearchLocation([38.070591, -78.44631099999]); //hardcode cville location
    // })
    // .catch(function(error) {
    //   console.log('ERROR in "makePlacesRequest"');
    //   console.log(error);
    // });

    getNearByRestaurants();
  };

  const getNearByRestaurants = () => {
  //   axios.get(
  //     "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?",
  //     {
  //       params: {
  //         location: searchLocation[0] + "," + searchLocation[1],
  //         radius: searchRadius,
  //         type: "restaurant",
  //         opennow: true,
  //         key: GP_API_KEY
  //       }
  //     }
  //   ).then(function (response) {

      // setAllRestaurants(response.data.results);
      
      //temp data
      setAllRestaurants(dummyData.results);
      console.log(allRestaurants);
    // });
  };

  const handleSelect = async value => { };

  return (
    <Row gutter={16} className="make-row-vert-span">
      {/* <Col span={2}>
        <Filter
          allRestaurants={allRestaurants}
          highToLow={highToLow}
          lowToHigh={lowToHigh}
          aToZ={aToZ}
          zToA={zToA}
          cleanup={cleanUp}
        />
      </Col> */}
      <Col span={11} className="make-col-vert-span">
        <Title level={2}>Enter your location</Title>
        <div className="sticky-search">
          <Search
            placeholder="input search text"
            size="large"
            id="userSearch"
            onSearch={searchString => {
              makePlacesRequest(searchString);
            }}
            enterButton
          />
        </div>
        <Title level={2} style={{marginTop: "15px"}}>Restaurants Near You</Title>
        <RestaurantDisplay allRestaurants={allRestaurants} />
      </Col>
      <Col span={13}>
        <MapDisplay allRestaurants={allRestaurants} />
      </Col>
    </Row>
  );
}

export default App;
