import { AutoComplete, Col, Divider, Row } from "antd";
import React, { useState } from "react";
import pic from "../../img/샤인머스켓.png";
import { NavLink } from "react-router-dom";
import { Space, Typography } from "antd";
import axios from "axios";
import { useEffect } from "react";
import {cloudServerIP} from "../../App"

const style = {
  padding: "8px 0",
  border : "3px solid black",
  textAlign: "center",
};
const imgStyle = {
  width: "200px",
  height: "220px",
};
const { Text } = Typography;
const productRootAddress = "shop-list/shop-detail/";

const Grid = ({ imgSigSrc, productId, productName, price, retailUnit }) => {
  return (
    <Col className="gutter-row" span={6}>
      <div className="main-flex-item" style={style}>
        <NavLink to={productRootAddress + productId} alt="profile">
          <img style={imgStyle} src={imgSigSrc} />
        </NavLink>
        <b>상품명 : {productName}</b>
        <p>
          {retailUnit}당<Text type="danger"> {price}</Text> 원
        </p>
      </div>
    </Col>
  );
};

export default Grid;
