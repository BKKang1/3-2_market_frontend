import React, { useState, useEffect } from "react";
import { Pie } from "@ant-design/plots";
import axios from "axios";
import PieGraph from "./PieGraph";
import {cloudServerIP} from "../../App"

const ProductPieGraph = ({ productId }) => {
  const redStyle = {
    color: "red",
  };
  const blueStyle = {
    color: "blue",
  };
  const [topPieGraph, setTopPieGraph] = useState([]);
  const [sellerPercent, setSellerPercent] = useState({
    name:null,
    price:null,
    percent:null,
  });
  useEffect(() => {
    axios.get(cloudServerIP + `/api/products/statistics/${productId}`,{withCredentials: true}).then((response) => {
      console.log("원형그래프", response.data.result);
      response.data.result.topPieGraphPercent.map((value) => {
        value.percent = Number(value.percent);
      });
      setTopPieGraph(response.data.result.topPieGraphPercent);
      setSellerPercent(response.data.result.sellerPercent);
    });
  }, []);

  if (topPieGraph.length !== 0 && sellerPercent !== null) {
    return (
      <div>
        <div>
        <PieGraph data={topPieGraph} />
        </div>
        
        <div>
          <p>
            해당 카테고리에서{" "}
            <p style={blueStyle}>{sellerPercent.name} 판매자가</p>
            <span style={redStyle}>
              {sellerPercent.price} 원 ({sellerPercent.percent}%)
            </span>
            만큼 판매
          </p>
        </div>
      </div>
    );
  } else if (topPieGraph.length !== 0) {
    return (
      <div>
        <PieGraph data={topPieGraph} />
      </div>
    );
  } else {
    return <div>판매 데이터 없음(원형 그래프)</div>;
  }
};
export default ProductPieGraph;
