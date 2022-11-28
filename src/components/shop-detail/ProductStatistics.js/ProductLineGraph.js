import { Select } from "antd";
import React, { useState } from "react";
import GraphController from "./GraphController";
import {cloudServerIP} from "../../../App"

const ProductLineGraph = ({ kindGradeId }) => {
  const [value, setValue] = useState();
  const onChange = (value) => {
    setValue(value)
  };
  return (
    <div>
      <Select
        showSearch
        placeholder="Select a graph"
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={[
          {
            value: 1,
            label: "연",
          },
          {
            value: 2,
            label: "월",
          },
          {
            value: 3,
            label: "일",
          },
        ]}
      />
      <GraphController
        value={value}
        kindGradeId={kindGradeId}
      ></GraphController>
    </div>
  );
};
export default ProductLineGraph;
