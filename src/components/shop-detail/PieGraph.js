import React, { useState, useEffect } from "react";
import { Pie } from "@ant-design/plots";
import {cloudServerIP} from "../../App"

function PieGraph({ data }) {
  const config = {
    appendPadding: 10,
    data,
    angleField: "percent",
    colorField: "name",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} />;
}

export default PieGraph;
