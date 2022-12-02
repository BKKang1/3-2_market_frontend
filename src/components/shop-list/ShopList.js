import { LikeOutlined, RightOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, List, Space } from "antd";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import { cloudServerIP } from "../../App";

const imgStyle = {
  width: "200px",
  height: "220px",
};

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

//function ShopList(props) {
function ShopList({ selId, casId, serverData, setServerData,pageNum,pageSize,totalItemNum,setPageNum,setPageSize,setTotalItemNum}) {

  useEffect(() => {
    axios
      .get(
        cloudServerIP +
          `/api/products?productName=&orderBy=${selId.current}&itemCategoryCode=${casId.current[0]}&itemCode=${casId.current[1]}&kindId=${casId.current[2]}&kindGradeId=${casId.current[3]}&pageSize=${pageSize}&pageNum=${pageNum}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        const data = response.data;
        setServerData(data.result);
        setTotalItemNum(data.lastPageNum * pageSize);
        console.log("serverdata: ", data);
      })
      .catch((error) => alert(error.response));
  }, [pageNum]);

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page, size) => {
          setPageSize(size);
          setPageNum(page);
        },
        total: totalItemNum,
        pageSize: pageSize,
        pageSizeOptions: [5, 10],
      }}
      dataSource={serverData}
      renderItem={(item) => {
        return (
          <List.Item
            key={item.productId}
            actions={[
              <IconText
                icon={StarOutlined}
                text={item.sellerRank + "등급"}
                key={item.sellerRank}
              />,
              <IconText
                icon={LikeOutlined}
                text={"백분위:" + item.sellerPercent + "%"}
                key={item.sellerPercent}
              />,
              <IconText
                icon={RightOutlined}
                text={"카테고리:" + item.category}
                key={item.category}
              />,
            ]}
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
              title={
                <p>
                  <Link to={`shop-detail/${item.productId}`}>
                    {" "}
                    {item.productName}
                  </Link>
                </p>
              }
              description={item.sellerName}
            />
            <h3>가격 : {item.price} 원 </h3>
            <h3>등록일 : {item.createdDate} </h3>
          </List.Item>
        );
      }}
    />
  );
}

export default ShopList;
