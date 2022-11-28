import React, { useEffect, useState, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { List } from "antd";
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import BuyerMyPage from "./BuyerMyPage";
import {cloudServerIP} from "../../App"

function BusinessApplicationList(){
    const navigate = useNavigate();
    const [data, setData] = useState([]);

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
        fontSize: "20px",
        fontWeight: "500",
        display: "flex",
        flexDirection: "column"
    };
  
    useEffect(() => {
        axios
        .get(cloudServerIP + "/api/business/user", {
          headers: { "Content-Type": "application/json" },
          withCredentials : true
        },)
        .then((response) => {
            console.log(response.data.result);
            setData(response.data.result);
        });
    }, []);

    return (
      <div>
        <BuyerMyPage></BuyerMyPage>
        <div className="box"style={style0}>
            <div className="business-detail" style={style1}>사업자 신청 내역</div>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 5,
                }}
                dataSource={data}
                renderItem={(item) => {
                    return (
                        <List.Item
                            key={item.businessNumber}
                        >
                        <List.Item.Meta
                        title={<span style = {style2}>{item.businessName}</span>}
                        description={<span style = {style3}>{item.businessNumber}</span>}
                        />
                        <div style = {style4}>
                            <span style = {style3}>신청 일자 : {item.createdDate}</span>
                            <span style = {style3}>변경 일자 : {item.changeDate}</span>
                            <span style = {style3}>{item.status}</span>
                        </div>
                        </List.Item>
                        )
                    }}
            />
        </div>
      </div>
    );
  }
  export default BusinessApplicationList;