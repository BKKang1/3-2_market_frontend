import "antd/dist/antd.min.css";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Button, Avatar, List, Space } from "antd";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import ManagerMyPage from "./ManagerMyPage";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
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
  marginTop: "5%",
  float: "right",
  marginLeft: "10px",
};

const style3 = {
  paddingBottom: "20%",
};

const imgStyle = {
  marginTop: "5%",
  display: "table",
  marginLeft: "auto",
  marginRight: "auto",
};

const BusinessDefault = () => {
  const { businessId } = useParams();
  let [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(cloudServerIP + `/api/business/${businessId}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials : true
      })
      .then((response) => {
        console.log(response.data.result);
        setData(response.data.result);
      });
  }, []);

  const accept = () => {
    axios
      .post(cloudServerIP + `/api/business/accept/${businessId}`, 
        { 
          headers: { "Content-Type": "application/json" },
          withCredentials: true 
        })
      .then((res) => {
        console.log(res.data.result);
        alert(res.data.result.msg);
        navigate(-1);
      })
      .catch((err) => {console.log(err); alert(err.response.data.msg)});
  }

  const reject = () => {
    axios
    .post(cloudServerIP + `/api/business/reject/${businessId}`, 
      { 
        headers: { "Content-Type": "application/json" },
        withCredentials: true 
      })
    .then((res) => {
      console.log(res.data.result);
      alert(res.data.result.msg);
      navigate(-1);
    })
    .catch((err) => {console.log(err); alert(err.response.data.msg)});
  }

    return (
        <>
            <ManagerMyPage></ManagerMyPage>
            <div className="list-box" style={style0}>
              <div className="business-detail" style={style1}>사업자 신청 내역서</div>
              <table>
                  <thead>
                    <tr>
                      <th class="pin"> </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>사업자 번호</th>
                      <td>{data.businessNumber}</td>
                    </tr>
                    <tr>
                      <th>상호명</th>
                      <td>{data.businessName}</td>
                    </tr>
                    <tr>
                      <th>신청 날짜</th>
                      <td>{data.createdDate}</td>
                    </tr>
                    <tr>
                      <th>회원 전화번호</th>
                      <td>{data.phoneNumber}</td>
                    </tr>
                    <tr>
                      <th>회원 이름</th>
                      <td>{data.userName}</td>
                    </tr>
                  </tbody>
              </table>
              <img style={imgStyle} src={cloudServerIP + data.imgSrc} />
              <Button className="button1" type="primary" style={style2} onClick = {accept}>
                승인
              </Button>
              <Button className="button2" type="primary" style={style2} onClick = {reject}>
                거부
              </Button>
              <div className="padding" style={style3}></div>
            </div>
        </>
    );
}
export default BusinessDefault;
