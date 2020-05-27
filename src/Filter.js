import React from "react";
import { render } from "@testing-library/react";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

const Filter = props => {
  const { allRestaurants, highToLow, lowToHigh, aToZ, zToA } = props;

  return (
    <Menu>
      <Menu.Item>
        <a onClick={() => highToLow(allRestaurants)}>Highest Rating</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={() => lowToHigh(allRestaurants)}>Lowest Rating</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={() => aToZ(allRestaurants)}>Sort by Name (A-Z)</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={() => zToA(allRestaurants)}>Sort by Name (Z-A)</a>
      </Menu.Item>
    </Menu>
  );
};

export default Filter;
