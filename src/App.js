import React, { useState } from "react";

import { Row, Col, Input, Typography, Dropdown, Menu, AutoComplete, Select } from "antd";
import { DownOutlined } from '@ant-design/icons';

import RestaurantDisplay from "./restaurant-display/RestaurantDisplay.js";
import MapDisplay from "./map-display/MapDisplay.js";
import Filter from "./Filter.js";

import "./App.css"

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

function App() {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [locationType, setLocationType] = useState("restaurant");
  const [searchLocation, setSearchLocation] = useState([38.033554, -78.507980]); //starts at CVille
  const [searchRadius, setSearchRadius] = useState(3000); //radius

  const axios = require("axios");

  const GP_API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

  //sort by rating (high to low)
  const highRating = arr => {
    let newArray = arr.slice();
    newArray.sort((a, b) => {
      return b.rating - a.rating;
    });
    setAllRestaurants(newArray);
  };

  //sort by rating (low to high)
  const lowRating = arr => {
    let newArray = arr.slice();
    newArray.sort((a, b) => {
      return a.rating - b.rating;
    });
    setAllRestaurants(newArray);
  };

  //sort by price (high to low)
  const highPrice = arr => {
    let newArray = arr.slice();
    newArray.sort((a, b) => {
      return b.price_level - a.price_level;
    });
    setAllRestaurants(newArray);
  };

  //sort by price (low to high)
  const lowPrice = arr => {
    let newArray = arr.slice();
    newArray.sort((a, b) => {
      return a.price_level - b.price_level;
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

  //Farthest away function
  const far = arr => {
    for(var i=0; i < allRestaurants.length; i++) {
      console.log(allRestaurants[i])
      const R = 6371e3; // metres
      const lat1 = allRestaurants[i].geometry.location.lat;
      const lat2 = searchLocation[0];
      const lon1 = allRestaurants[i].geometry.location.lng;
      const lon2 = searchLocation[1];
      const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
      const φ2 = lat2 * Math.PI / 180;
      const Δφ = (lat2 - lat1) * Math.PI / 180;
      const Δλ = (lon2 - lon1) * Math.PI / 180;
      const d = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(d), Math.sqrt(1 - d));
      const distMeters = R * c; // in metres
      allRestaurants[i].distMeters = distMeters;
    }
    let newArray = arr.slice();
    newArray.sort((a, b) => {
      return b.distMeters - a.distMeters;
    });
    setAllRestaurants(newArray);
  }


  //sorts by farthest distance
  const close = arr => {
    let newArray = arr.slice();
    newArray.sort((a, b) => {
      return a.distMeters - b.distMeters;
    });
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
        // console.log('ERROR in "makePlacesRequest"');
        // console.log(error);
      });

    getNearByRestaurants();
  };

  const validLocTypes = ["restaurant", "bar", "cafe"];
  const getNearByRestaurants = () => {
    axios
      .get(
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json?",
        {
          params: {
            location: searchLocation[0] + "," + searchLocation[1],
            radius: searchRadius,
            type: locationType,
            opennow: true,
            key: GP_API_KEY
          }
        }
      )
      .then(function (response) {
        setAllRestaurants(response.data.results);
        //console.log(allRestaurants);
      }).catch(function (error) {
        // console.log('ERROR in "getNearByRestaurants"');
        // console.log(error);
      });

  };

  return (
    <Row gutter={16} className="make-row-vert-span">
      <Col span={11} className="make-col-vert-span">
        <Title level={2}>Enter your location</Title>
        <div className="sticky-search">
          <Input.Group compact>
            <Search
              style={{ width: '75%' }}
              placeholder="input search text"
              size="large"
              id="userSearch"
              onSearch={searchString => { 
                makePlacesRequest(searchString);
              }}
              enterButton
            />
            <Select
              style={{ width: '25%' }}
              size="large"
              value={locationType}
              onChange={(e) => {
                setLocationType(e);
              }}>
                {validLocTypes.map(str => {return <Option value={str}>
                  {str}
                </Option>})}
            </Select>
          </Input.Group>
          
        </div>
        <div className="near-you-header">
          <Title level={2} style={{ marginTop: "15px" }}>Restaurants Near You</Title>
          <Dropdown overlay={
            <Menu>
              <Filter
                allRestaurants={allRestaurants}
                highRating={highRating}
                lowRating={lowRating}
                highPrice={highPrice}
                lowPrice={lowPrice}
                aToZ={aToZ}
                zToA={zToA}
                cleanup={cleanUp}
                far={far}
              />
            </Menu>
          }
            trigger={['click']}
            placement="bottomRight"
          >
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              Filter by <DownOutlined />
            </a>
          </Dropdown>
        </div>
        <RestaurantDisplay allRestaurants={allRestaurants} />
      </Col>
      <Col span={13}>
        <MapDisplay allRestaurants={allRestaurants} searchLocation={searchLocation} />
      </Col>
    </Row>
  );
}

export default App;
