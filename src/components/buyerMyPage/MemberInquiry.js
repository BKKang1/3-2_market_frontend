import "./Table.css";
import "antd/dist/antd.min.css";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Button, Space, Table, Tag } from 'antd';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { BrowserRouter, Link, Route, Routes, NavLink } from "react-router-dom";
import BuyerMyPage from "../buyerMyPage/BuyerMyPage";
import MemberEdit from "../buyerMyPage/MemberEdit";
import {cloudServerIP} from "../../App"

const size = 4;

const style0 = {
  marginLeft: "20%",
  marginRight: "20%",
  //textAlign : "center",
  borderTop: "2px solid",
};

const style1 = {
  marginTop: "5%",
  marginBottom: "5%",
  fontSize: "25px",
  fontWeight: "700",
};

const style2 = {
  marginTop: "5%",
  float: "right",
};

const style3 = {
  paddingBottom: "20%",
};

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

function MemberInquiry(){
  let [userInfo,setUserInfo] = useState({ });
  useEffect(() => {
    axios
      .get(cloudServerIP + "/api/user", 
        { withCredentials: true })
          .then((res) => {
            //console.log(res.data.result);
            setUserInfo(res.data.result);
            console.log(userInfo);
          })
          .catch((err) => {console.log(err);});
  }, []);

    return (
        <div>
            <BuyerMyPage></BuyerMyPage>
            <div className="list-box"style={style0}>
              <div className="business-detail" style={style1}>회원 상세 정보</div>
                <table>
                  <thead>
                    <tr>
                      <th class="pin"> </th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <th>이름</th>
                      <td>{userInfo.name}</td>
                    </tr>
                    <tr>
                      <th>ID</th>
                      <td>{userInfo.loginId}</td>
                    </tr>
                    <tr>
                      <th>비밀 번호</th>
                      <td>{userInfo.password}</td>
                    </tr>
                    <tr>
                      <th>e-mail</th>
                      <td>{userInfo.email}</td>
                    </tr>
                    <tr>
                      <th>생년월일</th>
                      <td>{userInfo.birth}</td>
                    </tr>
                    <tr>
                      <th>전화 번호</th>
                      <td>{userInfo.phoneNumber}</td>
                    </tr>
                    <tr>
                      <th>지번</th>
                      <td>{userInfo.jibun}</td>
                    </tr>
                    <tr>
                      <th>도로</th>
                      <td>{userInfo.road}</td>
                    </tr>
                    <tr>
                      <th>우편번호</th>
                      <td>{userInfo.zipcode}</td>
                    </tr>
                    <tr>
                      <th>상세주소</th>
                      <td>{userInfo.detailAddress}</td>
                    </tr>
                  </tbody>
              </table>
              <Link to="/BuyerMyPage/MemberInquiry/memberEidt">
                <Button className="button1" type="primary" style={style2}>
                  회원 정보 수정
                </Button>
              </Link>  
              <div className="padding" style={style3}></div>
            </div>
          </div>
    );
}
export default MemberInquiry;