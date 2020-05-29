import React from "react";

import { Card, Typography } from "antd";

import "./RestaurantDisplay.css"

const { Title } = Typography;

const RestaurantDisplay = (props) => {
  const { allRestaurants } = props;

  return (
    <div className="card-holder-holder">
      <div className="site-card-border-less-wrapper">
        {(allRestaurants.length === 0) ?
          <img className="homePic" src={require('../restaurant.svg')} alt="Logo" />
          :
          <div>
            {
              allRestaurants.map((restaurant, index) => {
                return (
                  <RestaurantCard key={index} restaurant={restaurant} />
                );
              })
            }
          </div>
        }
      </div>
    </div>
  )
}

const RestaurantCard = (props) => {
  const { restaurant } = props;

  return (
    <Card
      className="restaurant-card"
      size="small"
      title={restaurant.name}
      extra={<a href="#">More</a>} >
      <p className="card-text"><em>{restaurant.vicinity}</em></p>
      <p className="card-text">Rating: {restaurant.rating}</p>
      <p className="card-text">Price Level: {"$".repeat(restaurant.price_level)}</p>
    </Card>
  )
}

export default RestaurantDisplay;