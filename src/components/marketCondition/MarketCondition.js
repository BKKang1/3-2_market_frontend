import { Button, Layout, Menu } from "antd";
import { PageHeader } from "antd";
import "antd/dist/antd.min.css";
import pic from "../../img/회원.jpg"
import React, { useState } from "react";
import { BrowserRouter, Link, Route, Routes, NavLink } from "react-router-dom";
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
    marginLeft: "40px",
};
const style4 = {
    marginTop: "20px",
    marginBottom: "20px",
};
const style5 = {
    fontSize: "40px",
};

function MarketCondition(){
    return (
        <Layout className="total-box"style={style0}>
            <div className="title"style={style1}>
                <PageHeader className="site-page-header" title="농산품 시세" />
            </div>

            <div className = "manage-mypage-menu-box" style={style2}>
                <Menu>
                    <Menu.Item key="1"style={style4}>
                        <Link to="/marketCondition/YearlyPriceInquiry">
                            <label style={style5}> 연간 가격</label>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2"style={style4}>
                        <Link to="/marketCondition/MonthlyPriceInquiry">
                            <label style={style5}> 월간 가격 </label>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3"style={style4}>
                        <Link to="/marketCondition/DailyPriceInquiry">
                            <label style={style5}> 일간 가격 </label>
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
        </Layout>
    );
}
export default MarketCondition;