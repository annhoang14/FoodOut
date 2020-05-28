import React from "react";
import { render } from "@testing-library/react";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

const Filter = props => {
  const { allRestaurants, highRating, lowRating, aToZ, zToA, highPrice, lowPrice } = props;

  return (
    <Menu>
      <Menu.Item>
        <a onClick={() => highRating(allRestaurants)}>Highest Rating</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={() => lowRating(allRestaurants)}>Lowest Rating</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={() => aToZ(allRestaurants)}>Name (A-Z)</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={() => zToA(allRestaurants)}>Name (Z-A)</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={() => highPrice(allRestaurants)}>Highest Price</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={() => lowPrice(allRestaurants)}>Lowest Price</a>
      </Menu.Item>
    </Menu>
  );
};

export default Filter;
