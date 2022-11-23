import { Cascader } from "antd";
import React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {cloudServerIP} from "../../App"

const ShopCascader = ({ casId }) => {
  const [options, setOptions] = useState(null);

  useEffect(() => {
    axios.get(cloudServerIP + "/api/item-category").then((response) => {
      console.log(response.data.category);
      setOptions(response.data.category);
    });
  }, []);

  const onChange = (value) => {
    casId.current.fill("");
    casId.current[value.length - 1] = value[value.length - 1];
    console.log(casId.current);
  };
  return (
    <Cascader
      options={options}
      changeOnSelect
      onChange={onChange}
      fieldNames={{
        label: "name",
        value: "id",

        children: "category",
      }}
    />
  );
};

export default ShopCascader;