import "./Table.css";
import "antd/dist/antd.min.css";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Avatar, List, Button, Space, Table, Tag } from "antd";
import { BrowserRouter, Link, Route, Routes, NavLink, useNavigate} from "react-router-dom";
import BuyerMyPage from "../buyerMyPage/BuyerMyPage";
import MemberEdit from "../buyerMyPage/MemberEdit";
import TotalOrderModal from "../order/TotalOrderModal";
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
    fontSize: "25px",
    fontWeight: "500",
};

const style3 = {
  fontSize: "20px",
  fontWeight: "500",
};

const style4 = {
    display: "flex",
    marginTop: "5%",
};
const style5 = {
    display: "flex",
    marginTop: "5%",
};

const imgStyle = {
    width: "200px",
    height: "220px",
};

function Cart(){
    const [data, setData] = useState([]);
    const [trigger, setTrigger] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios
        .get(cloudServerIP + "/api/carts", {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log(response.data.result);
          setData(response.data.result);
        });
    }, [trigger]);

   
    const deletCart = (props) => {
        console.log("버튼 누르면 실행해야지");
        axios
          .delete(cloudServerIP + `/api/carts/${props}`, {
            headers: { "Content-Type": "application/json" },
          })
          .then((response) => {
            alert(response.data.result.msg);
            if(trigger == 1) setTrigger(0);
            else setTrigger(1);
            //window.location.reload();
          });
    };

    return (
        <div>
            <BuyerMyPage></BuyerMyPage>
            <div className="list-box"style={style0}>
                <div className="business-detail" style={style1}>장바구니</div>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 10,
                    }}
                    dataSource={data}
                    renderItem={(item) => {
                        return (
                            <List.Item
                                key={item.productId}
                                extra={
                                    <img
                                        width={272}
                                        alt="logo"
                                        src={cloudServerIP + item.signatureImgSrc}
                                        style={imgStyle}
                                    />
                                }
                            >
                            <List.Item.Meta
                            title={<NavLink to={`../shop-list/shop-detail/${item.productId}`} style = {style2}>{item.productName}</NavLink>}
                            description={<span style = {style3}>{item.price}</span>}
                            />
                            {item.count + item.retailUnit}
                            <Button className="button1" type="button" style = {style4} onClick = {() => deletCart(item.cartId)}>
                            삭제
                            </Button>
                            </List.Item>
                        )
                    }}
                />
                <TotalOrderModal
                    data = {data}
                ></TotalOrderModal>
            </div>
        </div>
    );
}
export default Cart;
