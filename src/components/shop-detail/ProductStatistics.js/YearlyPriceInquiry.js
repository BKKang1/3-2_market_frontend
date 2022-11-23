import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  PageHeader,
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
} from "antd";
import { BrowserRouter, Link, Route, Routes, NavLink } from "react-router-dom";
import LineGraph from "./LineGraph";
import {cloudServerIP} from "../../../App"

const style0 = {
  marginLeft: "20%",
  marginRight: "20%",
};
const style1 = {
  borderBottom: "2px solid",
  backgroundColor: "white",
};
const style2 = {
  margin: "2rem",
};
const style3 = {
  marginLeft: "14%",
  paddingBottom: "3%",
};
const style4 = {
  float: "right",
  marginLeft: "10px",
};
const style5 = {
  paddingBottom: "20%",
};

function YearlyPriceInquiry({ kindGradeId }) {
  const status1 = "연간-소매";
  const status2 = "연간-도매";

  const data1 = [status1, kindGradeId];
  const data2 = [status2, kindGradeId];

  return (
    <div>
    
        <LineGraph data={data1}></LineGraph>
        <LineGraph data={data2}></LineGraph>
 
    </div>
  );
}
export default YearlyPriceInquiry;
