import { Layout, Menu } from "antd";
import { PageHeader } from "antd";
import "antd/dist/antd.min.css";
import pic from "../../img/회원.jpg";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, List, Space } from "antd";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { BrowserRouter, Link, Route, Routes, NavLink } from "react-router-dom";
import ManagerMyPage from "./ManagerMyPage";
import {cloudServerIP} from "../../App"

const size = 4;

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

function BusinessApplicationInquiry(){
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
    .get(cloudServerIP + "/api/business", {
      headers: { "Content-Type": "application/json" },
      withCredentials : true
    })
    .then((response) => {
      console.log(response.data.result);
      setData(response.data.result);
    });
  }, []);

    return (
        <div>
            <ManagerMyPage></ManagerMyPage>
            <div className="list-box"style={style0}>
              <div className="business-detail" style={style1}>사업자 신청 내역서</div>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                    }}
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar src={"https://joeschmoe.io/api/v1/random"} />}
                            title={<Link to={"business-detail/" + item.businessId} style = {style2}>{item.userName}</Link>}
                            description={<span style = {style3}>{item.businessName}</span>}
                            />
                            {item.createdDate}
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
}
export default BusinessApplicationInquiry;
