import {
  Form,
  Cascader,
} from "antd";
import React, { useState,useEffect } from "react";
import axios from 'axios';
import {cloudServerIP} from "../../App"

function ProductCascader(props){
  // const onChange = (value) => {
  //   console.log(value);
  //   props.setOptions(value);
  // }; // Just show the latest item.
  const [options, setOptions] = useState(null);

  useEffect(() => {
    axios.get(cloudServerIP + "/api/item-category").then((response) => {
      console.log(response.data.category);
      setOptions(response.data.category);
    });
  }, []);

  const onChange = (value) => {
    let current = value[value.length - 1];
    console.log(current);
    props.setCode(current);
  };
  
  //const displayRender = (labels) => labels[labels.length - 1];

  return(
    <Form.Item>
          <Cascader
            options={options}
            //changeOnSelect
            onChange={onChange}
            fieldNames={{
              label: "name",
              value: "id",

              children: "category",
            }}
          />
    </Form.Item>
  );
};
export default ProductCascader;
