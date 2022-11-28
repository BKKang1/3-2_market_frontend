import { Button, Layout, Menu } from "antd";
import { PageHeader } from "antd";
import axios from "axios";
import "antd/dist/antd.min.css";
import pic from "../../img/회원.jpg";
import React, { location, useState, useEffect } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/userState";
import WithDrawlModal from "../withdrawal/WithDrawlModal";
import {cloudServerIP} from "../../App"

const style0 = {
  marginLeft: "20%",
  marginRight: "20%",
};
const style1 = {
  borderBottom: "2px solid",
  backgroundColor: "white",
  //display: "flex",
};
const style2 = {
  display: "flex",
  marginTop: "30px",
  marginBottom: "60px",
};
const style3 = {
  height: "120px",
  flexDirection: "column",
};
const style4 = {
  display: "flex",
  lineHeight: "90px",
  marginLeft: "40px",
  fontSize: "25px",
  fontWeight: "700",
};
const imgStyle = {
  marginLeft: "60px",
  width: "100px",
  height: "120px",
};
const style5 = {
  position: "relative",
  marginLeft: "40px",
};

const style7 = {
  paddingLeft: "20px",
};
const style8 = {
  marginLeft: "40px",
};
const style9 = {
  marginTop: "20px",
  marginBottom: "20px",
};
const style10 = {
  fontSize: "40px",
};
const style11 = {
  fontSize: "25px",
  position: "relative",
  left: "65%",
  marginBottom: "2%",
};

function SellerMyPage() {
  const [user, setUser] = useRecoilState(userState);
  const [userName, setUserName] = useState(" ");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (user == null) {
      navigate("/");
    } else {
      setUserName(user.name);
    }
  }, [user]);

  const logout = (e) => {
    console.log("logout btn is clicked");
    axios
      .get(cloudServerIP + "/api/user/logout", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          setUser(null);
          alert(response.data.result.msg);
        }
      });
  };

  return (
    <Layout className="total-box" style={style0}>
      <div className="title" style={style1}>
        <PageHeader className="site-page-header" title="마이 페이지" />
      </div>

      <div className="guest-info-box" style={style2}>
        <img style={imgStyle} src={pic} />
        <div className="guest-info" style={style3}>
          <span className="guest-text" style={style4}>
            안녕하세요 {userName}님.
          </span>
          <div className="button-box" style={style5}>
            <Button className="button1" type="primary" onClick={logout}>
              로그아웃
            </Button>
            <span style={style7}>
              <WithDrawlModal ></WithDrawlModal>
            </span>
          </div>
        </div>
      </div>
      <div
        className="seller-mypage-title-box"
        style={style1}
        onClick={() => window.location.reload()}
      >
        <NavLink to="/SellerMyPage">
          <PageHeader
            className="seller-mypage-title"
            title="판매자 마이 페이지"
          />
        </NavLink>
        <NavLink to="/BuyerMyPage">
          <div style={style11}>구매자 마이 페이지로 이동</div>
        </NavLink>
      </div>

            <div className = "seller-mypage-menu-box" style={style8}>
                <Menu>
                    <Menu.Item key="1"style={style9}>
                        <Link to="/SellerMyPage/RegisteredProduct">
                            <label style={style10}> 등록 상품 관리 </label>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2"style={style9}>
                        <Link to="/SellerMyPage/SellerGrade">
                            <label style={style10}> 판매자 등급 </label>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3"style={style9}>
                        <Link to="/SellerMyPage/SaleHistory">
                            <label style={style10}> 판매 내역 </label>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4"style={style9}>
                        <Link to="/SellerMyPage/SaleDataGraph">
                            <label style={style10}> 판매 정보 그래프 </label>
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
        </Layout>
    );
}
export default SellerMyPage;
