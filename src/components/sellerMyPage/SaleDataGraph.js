import { Button, Layout, Menu } from "antd";
import { PageHeader } from "antd";
import axios from 'axios';
import "antd/dist/antd.min.css";
import React, { location, useState, useEffect, useRef } from "react";
import { BrowserRouter, Link, Route, Routes, NavLink, useNavigate } from "react-router-dom";
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/userState";
import MonthChoice from "../main/MonthChoice";
import SellerMyPage from "./SellerMyPage";
import ShopCascader from "../shop-list/ShopCascader";
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
    display: "flex",
    marginBottom: "5%",
};

const style4 = {
    //float: "right",
    marginLeft: "5%",
};

const style5 = {
    marginBottom: "5%",
};

const style6 = {
    marginTop: "10%",
};

let options = {
    spanGaps: true,
};

function SaleDataGraph(){
    const casId = useRef(["", "", "", ""]);
    const [date, setDate] = useState();
    const [data1,setData1] = useState({
        labels: null,
        datasets: [null]
    });
    const [data2,setData2] = useState({
        labels: null,
        datasets: [null]
    });
    const [data3,setData3] = useState({
        labels: null,
        datasets: [null]
    });
    let arr1  = [
        {
            type: 'line',
            label: '본인 판매액 그래프 ',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 2,
            data: [],
        },
        {
            type: 'line',
            label: '전체 판매자 평균 판매액 그래프 ',
            borderColor: 'rgb(255, 0, 0)',
            borderWidth: 2,
            data: [],
        }
    ];
    let arr2  = [
        {
            type: 'line',
            label: '본인 판매액 백분위 그래프 ',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 2,
            data: [],
        },
    ];
    let arr3  = [
        {
            type: 'line',
            label: '본인 판매횟수 그래프 ',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 2,
            data: [],
        },
        {
            type: 'line',
            label: '전체 판매자 평균 판매횟수 그래프 ',
            borderColor: 'rgb(255, 0, 0)',
            borderWidth: 2,
            data: [],
        }
    ];

    const getGraphData1 = () => {
        axios
            .get(cloudServerIP + "/api/seller-mypage/order-price-statistics", {
                headers: { "Content-Type": "application/json" },
                params: {
                    startDate : date[0],
                    endDate : date[1],
                    itemCategoryCode : casId.current[0],
                    itemCode : casId.current[1],
                    kindId : casId.current[2],
                    kindGradeId : casId.current[3],
                },
            },)
            .then((response) => {
                console.log(response.data);
                arr1[0].data = response.data.result.myPriceList;
                arr1[1].data = response.data.result.avgPriceList;
                setData1({"labels" : response.data.result.dateList, "datasets" : arr1});
            })
            .catch((err) => {console.log(err); alert(err.response.data.msg);});
    };

    const getGraphData2 = () => {
        axios
            .get(cloudServerIP + "/api/seller-mypage/order-price-percentile-statistics", {
                headers: { "Content-Type": "application/json" },
                params: {
                    startDate : date[0],
                    endDate : date[1],
                    itemCategoryCode : casId.current[0],
                    itemCode : casId.current[1],
                    kindId : casId.current[2],
                    kindGradeId : casId.current[3],
                },
            },)
            .then((response) => {
                console.log(response.data);
                arr2[0].data = response.data.result.percentileList;
                setData2({"labels" : response.data.result.dateList, "datasets" : arr2});
            })
            .catch((err) => {console.log(err); alert(err.response.data.msg);});
    };

    const getGraphData3 = () => {
        axios
            .get(cloudServerIP + "/api/seller-mypage/order-count-statistics", {
                headers: { "Content-Type": "application/json" },
                params: {
                    startDate : date[0],
                    endDate : date[1],
                    itemCategoryCode : casId.current[0],
                    itemCode : casId.current[1],
                    kindId : casId.current[2],
                    kindGradeId : casId.current[3],
                },
            },)
            .then((response) => {
                console.log(response.data.result);
                arr3[0].data = response.data.result.myCountList;
                arr3[1].data = response.data.result.avgCountList;
                setData3({"labels" : response.data.result.dateList, "datasets" : arr3});
            })
            .catch((err) => {console.log(err); alert(err.response.data.msg);});
    };

    return (
        <div>
            <SellerMyPage></SellerMyPage>
            <div className="list-box"style={style0}>
                <div style={style6}>
                    <div style = {style3}>
                        <ShopCascader casId={casId} />
                    </div>
                    <div style={style5}>
                        <MonthChoice setDate = {setDate}></MonthChoice>
                        <Button className="button3" type="primary" style={style4} onClick={() =>{getGraphData1(); getGraphData2(); getGraphData3();}}>
                            조회
                        </Button>
                    </div>
                </div>
                <div className="sale-data-graph1" style={style1}>판매액 그래프</div>
                <div style = {style2}>
                    <Line type="line" data={data1} options ={options} />
                </div>
                <div className="sale-data-graph2" style={style1}>판매액 백분위 그래프</div>
                <div style = {style2}>
                    <Line type="line" data={data2} options ={options} />
                </div>
                <div className="sale-data-graph2" style={style1}>판매횟수 그래프</div>
                <div style = {style2}>
                    <Line type="line" data={data3} options ={options} />
                </div>        
            </div>
        </div>
    );
}
export default SaleDataGraph;