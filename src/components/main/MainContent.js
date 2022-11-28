import axios from "axios";
import { useEffect, useState } from "react";
import Grid from "./Grid";
import MainCarousel from "./MainCarousel";
import { AutoComplete, Col, Divider, Row } from "antd";
import {cloudServerIP} from "../../App"

const textStyle = {

  margin: "auto",

  textAlign: "center",
};

function MainContent() {

  const [lastet, setLastet] = useState([
    {
      imgSigSrc: null,
      productId: null,
      productName: null,
      price: null,
      retailUnit: null,
    },
  ]);

  const [topOrder, setTopOrder] = useState([
    {
      imgSigSrc: null,
      productId: null,
      productName: null,
      price: null,
      retailUnit: null,
    },
  ]);
  const [reviewRate, setReviewRate] = useState([
    {
      imgSigSrc: null,
      productId: null,
    },
  ]);
  useEffect(() => {
    console.log(cloudServerIP);
    axios
      .get(cloudServerIP + "/api/products/main-page/latest", {
        headers: { "Content-Type": "application/json" },
        withCredentials : true
      })
      .then((res) => {
        setLastet(res.data.result);
        console.log(lastet);
      });
    axios
      .get(cloudServerIP + "/api/products/main-page/order-count", {
        headers: { "Content-Type": "application/json" },
        withCredentials : true
      })
      .then((res) => {
        setTopOrder(res.data.result);
        console.log(topOrder);
      });
    axios
      .get(cloudServerIP + "/api/products/main-page/review-rate-avg", {
        headers: { "Content-Type": "application/json" },
        withCredentials : true
      })
      .then((res) => {
        setReviewRate(res.data.result);
        console.log(reviewRate);
      });
  }, []);
  return (
    <div>
      <MainCarousel reviewRate={reviewRate}></MainCarousel>

      <Divider></Divider>
      <div>
        <div style={textStyle}>
          <b>최근에 등록된 상품</b>
        </div>

        <Row gutter={[16, 24]}>
          {lastet.map((value, i) => {
            return (
              <Grid
                key={i}
                imgSigSrc={cloudServerIP + value.imgSigSrc}
                productId={value.productId}
                productName={value.productName}
                price={value.price}
                retailUnit={value.retailUnit}
              ></Grid>
            );
          })}
        </Row>
      </div>
      <Divider></Divider>
      <div>
        <div style={textStyle}>
          <b>많이 팔린 상품</b>
        </div>
        <Row gutter={[16, 24]}>
          {topOrder.map((value, i) => {
            return (
              <Grid
                key={i}
                imgSigSrc={cloudServerIP + value.imgSigSrc}
                productId={value.productId}
                productName={value.productName}
                price={value.price}
                retailUnit={value.retailUnit}
              ></Grid>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
export default MainContent;
