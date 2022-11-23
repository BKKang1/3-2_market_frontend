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
import YearChoice from "../../main/YearChoice";
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

function MonthlyPriceInquiry({ kindGradeId }) {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [date, setDate] = useState();

  const status1 = "월간-소매";
  const status2 = "월간-도매";

  function setDatas() {
    console.log(kindGradeId);
    console.log(date);
    setData1([status1, kindGradeId, date]);
    setData2([status2, kindGradeId, date]);
  }

  return (
    <div>
     
        <Form
          style={style2}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
        >
          <Form.Item label="월간 조회">
         
            <YearChoice setDate={setDate}></YearChoice>
            <Button
              className="button1"
              type="primary"
              style={style4}
              onClick={setDatas}
            >
              조회
            </Button>
          </Form.Item>
        </Form>
    
        <LineGraph data={data1}></LineGraph>
        <LineGraph data={data2}></LineGraph>
 
  
    </div>
  );
}
export default MonthlyPriceInquiry;
