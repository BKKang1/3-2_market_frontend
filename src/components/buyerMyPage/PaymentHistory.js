import "antd/dist/antd.min.css";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import axios from 'axios';
import MonthChoice from "../main/MonthChoice";
import BuyerMyPage from "./BuyerMyPage";
import { Avatar, Divider, List, Skeleton, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PaymentHistoryDetail from "../buyerMyPage/PaymentHistoryDetail";
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

const style4 = {
    marginTop: "2%",
    marginBottom: "3%",
    fontSize: "25px",
};

const style5 = {
    color: "blue",
};

const style6 = {
    color: "red",
};

function PaymentHistory(){
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState([]);
    const [data, setData] = useState([]);
    const [trigger, setTrigger] = useState(0);
    const [listDetail, setListDetail] = useState([]);
    const [pageNum,setPageNum] = useState(1);
    const [orderNum,setOrderNum] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);

    useEffect(() => {
        setData([]);
        setPageNum(1);
        setTotalPrice(0);
    }, [date]);

    const loadMoreData = () => {
        if (loading) {
            return;
        }

        setLoading(true);

        axios.
        get(cloudServerIP + "/api/buyer-mypage/order-history", {
            headers: { "Content-Type": "application/json" },
            params: {
                startDate : date[0],
                endDate : date[1],
                pageSize : 10,
                pageNum : pageNum,
            },
        })
        .then((res) => {
            console.log(res);
            setData([...data, ...res.data.result]);
            setPageNum(pageNum + 1);
            setOrderNum(res.data.totalNum);
            setTotalPrice(res.data.totalPrice);
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
            console.log(err); 
            setDate([]);
            setTotalPrice(0);
            alert(err.response.data.msg);
        });
    };

    return(
        <div>
            <BuyerMyPage></BuyerMyPage>
                <div className="list-box"style={style0}>
                    <div className="business-detail" style={style1}>결제 내역</div>
                    <div style = {style2}>
                        <MonthChoice setDate = {setDate}></MonthChoice>
                        <Button className="button1" type="primary" style={style3} onClick={loadMoreData}>
                            조회
                        </Button>
                    </div>
                    {
                        (totalPrice != 0)&&<div style={style4}>
                            <span style={style5}>{date[0]}</span>에서 <span style={style5}>{date[1]}</span>까지의 총 결재액 : <span style={style6}>{totalPrice}원</span>
                        </div>
                    } 
                    <div
                        id="scrollableDiv"
                        style={{
                            height: 400,
                            overflow: 'auto',
                            padding: '0 16px',
                            border: '1px solid rgba(140, 140, 140, 0.35)',
                        }}
                        >
                        <InfiniteScroll
                            dataLength={data.length}
                            next={loadMoreData}
                            hasMore={data.length < orderNum}
                            loader={
                            <Skeleton
                                avatar
                                paragraph={{
                                rows: 1,
                                }}
                                active
                            />
                            }
                            endMessage={<Divider plain>It is all, nothing more</Divider>}
                            scrollableTarget="scrollableDiv"
                        >
                            <List
                            dataSource={data}
                            renderItem={(item) => (
                                <>
                                    <List.Item key={item.orderId}>
                                        <List.Item.Meta
                                            title={<span onClick={() => {setListDetail(item.productList); setTrigger(item.orderId); }}>{item.createdDate + " 결제 내역"}</span>}
                                            description={item.totalPrice} />
                                        <div>{item.totalCount + "건"}</div>
                                    </List.Item>
                                    {(trigger == item.orderId) &&<PaymentHistoryDetail props = {listDetail}></PaymentHistoryDetail>}
                                </>
                            )}
                            />  
                        </InfiniteScroll>
                    </div>  
                </div>   
        </div>
    );
}
export default PaymentHistory;