import { useEffect, useState, useRef } from "react";
import {cloudServerIP} from "../../App"

function PriceComparison({ price, retail, wholesale }) {
  const redStyle = {
    color: "red",
  };
  const blueStyle = {
    color: "blue",
  };
  const [retailGap, setRetailGap] = useState();
  const [retailGapPer, setRetailGapPer] = useState();
  const [wholeSaleGap, setwholeSaleGap] = useState();
  const [wholeSaleGapPer, setwholeSaleGapPer] = useState();
  const [returnType, setReturnType] = useState();
  useEffect(() => {
    console.log(retail);
    console.log(wholesale);
    if (retail.price) {
      setRetailGap(Math.abs(retail.price - price));
      setRetailGapPer(Math.floor((price / retail.price) * 100));

    }

    if (wholesale.price) {
      setwholeSaleGap(Math.abs(wholesale.price - price));
      setwholeSaleGapPer(Math.floor((price / wholesale.price) * 100));
 
    }
  }, [price]);

  if (retail.price !== null && wholesale.price !== null) {
    return (
      <div>
        <h2>
          {wholesale.latestDate} 도매가 {wholesale.price}원 보다{" "}
          <span style={price>wholesale.price?redStyle:blueStyle}>
            {wholeSaleGap} ({wholeSaleGapPer}%)
          </span>{" "}
          원 차이
        </h2>
        <h2>
          {retail.latestDate} 소매가 {retail.price}원 보다{" "}
          <span style={price>retail.price?redStyle:blueStyle}>
            {retailGap} ({retailGapPer}%){" "}
          </span>
          원 차이
        </h2>
      </div>
    );
  } else if (wholesale.price !== null) {
    return (
      <div>
        <h2>
          {wholesale.latestDate} 도매가 ({wholesale.price}) 보다{" "}
          <span style={price>wholesale.price?redStyle:blueStyle}>
            {wholeSaleGap} ({wholeSaleGapPer}%)
          </span>{" "}
          원 차이
        </h2>
      </div>
    );
  } else if (retail.price !== null) {
    return (
      <div>
        <h2>
          {retail.latestDate} 소매가 {retail.price}원 보다{" "}
          <span style={price>retail.price?redStyle:blueStyle}>
            {retailGap} ({retailGapPer}%){" "}
          </span>
          원 차이
        </h2>
      </div>
    );
  } else {
    return (
      <div>
        <h2>시세 데이터 없음</h2>
      </div>
    );
  }
}
export default PriceComparison;
