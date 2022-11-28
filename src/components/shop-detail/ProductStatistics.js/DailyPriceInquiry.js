import React, { useState } from "react";
import { PageHeader, Form, Button } from "antd";
import DateChoice from "../../main/DateChoice";
import LineGraph from "./LineGraph";
import {cloudServerIP} from "../../../App"

const style0 = {
  marginLeft: "20%",
  marginRight: "20%",
  marginBottom: "5%",
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

function DailyPriceInquiry({kindGradeId}) {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [date, setDate] = useState([]);

  const status1 = "일간-소매";
  const status2 = "일간-도매";

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
          <Form.Item label="일간 조회">
            <DateChoice setDate={setDate}></DateChoice>
          </Form.Item>
          <Button
            className="button1"
            type="primary"
            style={style4}
            onClick={setDatas}
          >
            조회
          </Button>
        </Form>

        <LineGraph data={data1}></LineGraph>
        <LineGraph data={data2}></LineGraph>



    </div>
  );
}
export default DailyPriceInquiry;
