import { Button, Layout, Menu, List } from "antd";
import { PageHeader } from "antd";
import axios from 'axios';
import "antd/dist/antd.min.css";
import React, { location, useState, useEffect, useRef } from "react";
import { BrowserRouter, Link, Route, Routes, NavLink, useNavigate } from "react-router-dom";
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/userState";
import SellerMyPage from "./SellerMyPage";
import MonthChoice from "../main/MonthChoice";
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

const style7 = {
    color: "red",
};

let options = {
    spanGaps: true,
};

function SellerGrade(){
    const [curGrade,setCurGrade] = useState(0);
    const [date, setDate] = useState();
    const [data1,setData1] = useState({
        labels: null,
        datasets: [null]
    });
    const [data2,setData2] = useState({
        labels: null,
        datasets: [null]
    });
    let arr1  = [
        {
            type: 'line',
            label: '본인 신뢰점수 그래프 ',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 2,
            data: [],
        },
    ];
    let arr2  = [
        {
            type: 'line',
            label: '본인 신뢰점수 백분위 그래프 ',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 2,
            data: [],
        },
    ];

    useEffect(() => {
        axios
        .get(cloudServerIP + "/api/seller-mypage/trust-score", {
            headers: { "Content-Type": "application/json" },
        },)
        .then((response) => {
            console.log(response.data.result);
            setCurGrade(response.data.result);
        })
        .catch((err) => {console.log(err); alert(err.response.data.msg);});
    }, []);


    const getGraphData1 = () => {
        axios
            .get(cloudServerIP + "/api/seller-mypage/trust-score-statistics", {
                headers: { "Content-Type": "application/json" },
                params: {
                    startDate : date[0],
                    endDate : date[1],
                },
            },)
            .then((response) => {
                console.log(response);
                arr1[0].data = response.data.result.scoreList;
                setData1({"labels" : response.data.result.dateList, "datasets" : arr1});
            })
            .catch((err) => {console.log(err); alert(err.response.data.msg);});
    };

    const getGraphData2 = () => {
        axios
            .get(cloudServerIP + "/api/seller-mypage/trust-score-percentile-statistics", {
                headers: { "Content-Type": "application/json" },
                params: {
                    startDate : date[0],
                    endDate : date[1],
                },
            },)
            .then((response) => {
                console.log(response.data);
                arr2[0].data = response.data.result.percentileList;
                setData2({"labels" : response.data.result.dateList, "datasets" : arr2});
            })
            .catch((err) => {console.log(err); alert(err.response.data.msg);});
    };

    return(
        <div>
        <SellerMyPage></SellerMyPage>
        <div className="list-box"style={style0}>
            <div style={style6}>
                <div style={style5}>
                    <MonthChoice setDate = {setDate}></MonthChoice>
                    <Button className="button3" type="primary" style={style4} onClick={() =>{getGraphData1(); getGraphData2();}}>
                        조회
                    </Button>
                </div>
            </div>
            <div className="sale-data" style={style1}>현재 신뢰점수 : <span style={style7}>{curGrade}</span></div>
            <div className="sale-data-graph1" style={style1}>신뢰점수 그래프</div>
            <div style = {style2}>
                <Line type="line" data={data1} options ={options} />
            </div>
            <div className="sale-data-graph2" style={style1}>신뢰점수 백분위 그래프</div>
            <div style = {style2}>
                <Line type="line" data={data2} options ={options} />
            </div>        
        </div>
    </div>
    );
}
export default SellerGrade;