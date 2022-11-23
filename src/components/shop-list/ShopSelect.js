import { Select } from "antd";
import React from "react";
import {cloudServerIP} from "../../App"

const { Option } = Select;

const ShopSelect = ({ selId }) => {
  const onChange = (value) => {

    console.log(value);
    selId.current = value;
  };
  return (
    <Select
      showSearch
      placeholder="Select"
      optionFilterProp="children"
      onChange={onChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().includes(input.toLowerCase())
      }
    >
      <Option value="latest">시간순</Option>
      <Option value="price">가격순</Option>
    </Select>
  );
};
export default ShopSelect;
