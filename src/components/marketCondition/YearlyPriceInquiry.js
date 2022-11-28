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
import MarketCondition from "./MarketCondition";
import ProductCascader from "./ProductCascader";
import YearChoice from "../main/YearChoice";
import LineGraph from "./LineGraph"
import {cloudServerIP} from "../../App"

const style0 = {
    marginLeft: "20%",
    marginRight: "20%",
};
const style1 = {
    borderBottom: "2px solid",
    backgroundColor: "white",
};
const style2 = {
    margin :"2rem"
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

function YearlyPriceInquiry(){
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [date, setDate] = useState();
    const [code, setCode] = useState();
    const status1 = "연간-소매"; 
    const status2 = "연간-도매"; 

    function setDatas(){
        console.log(code);
        console.log(date);
        setData1([status1,code]);
        setData2([status2,code]);
    }

    return (      
        <div>
            <MarketCondition></MarketCondition>
            <div style={style0}>
                <div style={style1}>
                <PageHeader className="manage-mypage-title" title="연간 가격" />       
                </div>
                <Form style={style2}
                    labelCol={{
                    span: 4,
                    }}
                    wrapperCol={{
                    span: 14,
                    }}
                    layout="horizontal"
                >
                <Form.Item label="품목">
                    <ProductCascader setCode = {setCode}></ProductCascader>
                    </Form.Item>
                </Form>
                <div style = {style3}>
                    <Button className="button1" type="primary" style={style4} onClick={setDatas}>
                        조회
                    </Button>
                </div>
                <LineGraph data = {data1}></LineGraph>
                <LineGraph data = {data2}></LineGraph>
            </div>
            <div className="padding" style={style5}></div>
        </div>
    );
}
export default YearlyPriceInquiry;