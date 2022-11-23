
import "antd/dist/antd.min.css";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Avatar, List, Button, Space, Table, Tag } from "antd";
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import MonthChoice from "../main/MonthChoice";
import BuyerMyPage from "./BuyerMyPage";
import {cloudServerIP} from "../../App"

const style0 = {
    marginLeft: "20%",
    marginRight: "20%",
    borderTop: "2px solid",
  };
  
const style1 = {
    paddingTop: "5%",
    paddingBottom: "5%",
    fontSize: "25px",
    fontWeight: "700",
    color: "black",
};

const style2 = {
    //marginLeft: "14%",
    paddingBottom: "3%",
};
const style3 = {
    float: "right",
    marginLeft: "10px",
};

let options = {
    spanGaps: true,
};

function PaymentHistoryGraph(){
    const [date, setDate] = useState();
    const [data,setData] = useState({
        labels: null,
        datasets: [null]
    });
    let arr  = [{
        type: 'line',
        label: '결제 금액 그래프 ',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 2,
        data: [],
    }];

    const getGraphData = () => {
        axios
            .get(cloudServerIP + "/api/buyer-mypage/order-price-statistics", {
                headers: { "Content-Type": "application/json" },
                params: {
                    startDate : date[0],
                    endDate : date[1],
                },
            },)
            .then((response) => {
                console.log(response.data.result);
                arr[0].data = response.data.result.priceList;
                setData({"labels" : response.data.result.dateList, "datasets" : arr});
                //console.log(data);
            })
            .catch((err) => {console.log(err);});
    };

    return(
        <div>
            <BuyerMyPage></BuyerMyPage>
            <div className="list-box"style={style0}>
                <div className="business-detail" style={style1}>결제 금액 그래프</div>
                <div style = {style2}>
                    <MonthChoice setDate = {setDate}></MonthChoice>
                    <Button className="button1" type="primary" style={style3} onClick={getGraphData}>
                        조회
                    </Button>
                    <Line type="line" data={data} options ={options} />
                </div>   
            </div>
        </div>
    );
}
export default PaymentHistoryGraph;