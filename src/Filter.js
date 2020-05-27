import React from 'react'
import { render } from '@testing-library/react'
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Filter = () => {

    //sort by rating (low to high)
    lowToHigh = (arr) => {
        sorted = arr.sort((a,b) => {
          return a.rating - b.rating;
        }); return sorted;
      }
    //sort by rating (high to low)
    highToLow = (arr) => {
        sorted = arr.sort((a,b) => {
          return b.rating - a.rating;
        }); return sorted;
      }
    //sort by name (a-z)

    //sort by name (za)

    return(
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          1st filter item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
          3rd filter item
        </a>
      </Menu.Item>
    </Menu>
    );
}

export default Filter;