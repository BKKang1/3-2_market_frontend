import React, { useState, useEffect } from "react";
import axios from 'axios';
import "antd/dist/antd.min.css";
import "./Table.css";
import { Button, Space, Table, Tag } from 'antd';
import { BrowserRouter, Link, Route, Routes, NavLink } from "react-router-dom";
import BuyerMyPage from "../buyerMyPage/BuyerMyPage";
import {cloudServerIP} from "../../App"

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

function MemberEdit(){
  let [userInfo,setUserInfo] = useState({ });
  const { name, loginId, password, birth, email, phoneNumber, jibun, road, zipcode, detailAddress} = userInfo; 

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

  const onChange = (e) => {
    const { name, value } = e.target   

    const nextInputs = {            
      ...userInfo,  
      [name]: value,
    }

    setUserInfo(nextInputs)
    console.log(userInfo);     
  }  
  
  const updateUserInfo = () => {
    axios
      .patch(cloudServerIP + "/api/user", userInfo,
      { withCredentials: true })
      .then((res) => {
        console.log(res.data.result.msg);
        alert(res.data.result.msg);
      })
      .catch((err) => {console.log(err.response.data.msg); alert(err.response.data.msg);});
  }

    return (
        <div>
            <BuyerMyPage></BuyerMyPage>
            <div className="list-box"style={style0}>
                <div className="business-detail" style={style1}>회원 정보 수정</div>
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
                      <td>
                        <input 
                          name="name" 
                          type = "text" 
                          placeholder={userInfo.name}
                          onChange={onChange}
                          value={name} 
                          >
                        </input>
                      </td>
                    </tr>
                    <tr>
                      <th>ID</th>
                      <td>
                        <input 
                          name="loginId" 
                          type = "text" 
                          placeholder={userInfo.loginId}
                          onChange={onChange}
                          value={loginId}
                          >
                        </input>
                      </td>
                    </tr>
                    <tr>
                      <th>비밀 번호</th>
                      <td>
                        <input 
                          name="password" 
                          type = "password" 
                          placeholder={userInfo.password}
                          onChange={onChange}
                          value={password}
                          >
                        </input>
                      </td>
                    </tr>
                    <tr>
                      <th>생년월일</th>
                      <td>
                        <input 
                          name="birth" 
                          type = "text" 
                          placeholder={userInfo.birth}
                          onChange={onChange}
                          value={birth}
                          >
                        </input>
                      </td>
                    </tr>
                    <tr>
                      <th>e-mail</th>
                      <td>
                        <input 
                          name="email" 
                          type = "email" 
                          placeholder={userInfo.email}
                          onChange={onChange}
                          value={email}
                          >
                        </input>
                      </td>
                    </tr>
                    <tr>
                      <th>전화 번호</th>
                      <td>
                        <input 
                          name="phoneNumber" 
                          type = "tel" 
                          placeholder={userInfo.phoneNumber}
                          onChange={onChange}
                          value={phoneNumber}
                          >
                        </input>
                      </td>
                    </tr>
                    <tr>
                      <th>지번</th>
                      <td>
                        <input 
                          name="jibun" 
                          type = "text" 
                          placeholder={userInfo.jibun}
                          onChange={onChange}
                          value={jibun}
                          >
                        </input>
                      </td>
                    </tr>
                    <tr>
                      <th>도로</th>
                      <td>
                        <input 
                          name="road" 
                          type = "text" 
                          placeholder={userInfo.road}
                          onChange={onChange}
                          value={road}
                          >
                        </input>
                      </td>
                    </tr>
                    <tr>
                      <th>우편번호</th>
                      <td>
                        <input 
                          name="zipcode" 
                          type = "text" 
                          placeholder={userInfo.zipcode}
                          onChange={onChange}
                          value={zipcode}
                          >
                        </input>
                      </td>
                    </tr>
                    <tr>
                      <th>상세주소</th>
                      <td>
                        <input 
                          name="detailAddress" 
                          type = "text" 
                          placeholder={userInfo.detailAddress}
                          onChange={onChange}
                          value={detailAddress}
                          >
                        </input>
                      </td>
                    </tr>
                  </tbody>
              </table>
              <Link to="/BuyerMyPage/MemberInquiry">
                <Button className="button1" type="primary" style={style2} onClick = {updateUserInfo}>
                  수정
                </Button>
              </Link>  
              <div className="padding" style={style3}></div>
            </div>
        </div>
    );
}
export default MemberEdit;