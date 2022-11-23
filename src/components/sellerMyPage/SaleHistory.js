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
import MonthChoice from "../main/MonthChoice";
import SellerMyPage from "./SellerMyPage";
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
    float: "right",
    marginLeft: "10px",
};

const style5 = {
    fontSize: "25px",
    fontWeight: "500",
};

const style6 = {
  fontSize: "20px",
  fontWeight: "500",
};

const style7 = {
    marginTop: "2%",
    marginBottom: "5%",
    fontSize: "25px",
};

const style8 = {
    color: "blue",
};

const style9 = {
    color: "red",
};

const imgStyle = {
    width: "200px",
    height: "220px",
};

function SaleHistory(){
    const [date, setDate] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [totalItemNum, setTotalItemNum] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [serverData, setServerData] = useState([]);
    const [totalPrice,setTotalPrice] = useState(0);

    useEffect(() => {
        if(date != null){
            getData();
        }
    }, [pageNum,pageSize]);

    const getData = () => {
        axios
            .get(cloudServerIP + "/api/seller-mypage/sale-history", {
                headers: { "Content-Type": "application/json" },
                params: {
                    startDate : date[0],
                    endDate : date[1],
                    pageSize : pageSize,
                    pageNum : pageNum,
                },
            },)
            .then((response) => {
                console.log(response);
                setServerData(response.data.result);
                setTotalItemNum(response.data.totalNum * pageSize);
                setTotalPrice(response.data.totalPrice);
        
            })
            .catch((err) => {
                console.log(err); 
                setDate([]);
                setTotalPrice(0);
                alert(err.response.data.msg);
            });
    };


    return(
       <div>
        <SellerMyPage></SellerMyPage>
            <div className="list-box"style={style0}>
                <div className="business-detail" style={style1}>판매내역</div>
                <div style = {style2}>
                    <div style={style3}>
                        <MonthChoice setDate = {setDate}></MonthChoice>
                        <Button className="button1" type="primary" style={style4} onClick={getData}>
                            조회
                        </Button>
                    </div>
                    {
                        (totalPrice != 0)&&<div style={style7}>
                            <span style={style8}>{date[0]}</span>에서 <span style={style8}>{date[1]}</span>까지의 총 판매액 : <span style={style9}>{totalPrice}원</span>
                        </div>
                    } 
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: (page,size) => {
                            
                            setPageSize(size);
                            setPageNum(page);
                    
                            },
                            total: totalItemNum,
                            pageSize:pageSize,
                            pageSizeOptions: [5, 10],
                    
                        }}
                        dataSource={serverData}
                        renderItem={(item) => {
                            return (
                            <List.Item
                                //key={item.productId}
                                extra={
                                <img
                                    width={272}
                                    alt="logo"
                                    src={cloudServerIP + item.path}
                                    style={imgStyle}
                                />
                                }
                            >
                                <List.Item.Meta
                                title={
                                    <p>
                                    <Link to={`../shop-list/shop-detail/${item.productId}`} style={style5}>
                                        {" "}
                                        {item.productName}
                                    </Link>
                                    </p>
                                }
                                description={<span style = {style6}>주소 : {item.jibun + " " + item.detailAddress}</span>}
                                />
                                <h3>결제 상품 갯수 : {item.count} 개 </h3>
                                <h3>결제액 : {item.price} 원 </h3>
                                <h3>판매일 : {item.createdDate} </h3>
                            </List.Item>
                            );
                        }}
                        />
                </div>   
            </div>
       </div> 
    );
}
export default SaleHistory;