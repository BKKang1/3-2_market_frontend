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

function BuyerMyPage() {
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

  const ifBuyer = () => {
    if (user != null) {
      if (user.userType == "SELLER") {
        return (
          <NavLink to="/SellerMyPage">
            <div style={style11}>판매자 마이 페이지로 이동</div>
          </NavLink>
        );
      }
    }
  };

  const logout = (e) => {
    console.log("logout btn is clicked");
    axios
      .get(cloudServerIP + "/api/user/logout", {
        headers: { "Content-Type": "application/json" },
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
              <WithDrawlModal></WithDrawlModal>
            </span>
          </div>
        </div>
      </div>

      <div
        className="buyer-mypage-title-box"
        style={style1}
        onClick={() => window.location.reload()}
      >
        <NavLink to="/BuyerMyPage">
          <PageHeader
            className="buyer-mypage-title"
            title="구매자 마이 페이지"
          />
        </NavLink>
        {ifBuyer(() => {})}
      </div>

      <div className="buyer-mypage-menu-box" style={style8}>
        <Menu>
          <Menu.Item key="1" style={style9}>
            <Link to="/BuyerMyPage/MemberInquiry">
              <label style={style10}> 회원 상세 정보</label>
            </Link>
          </Menu.Item>
          <Menu.Item key="2" style={style9}>
            <Link to="/BuyerMyPage/Cart">
              <label style={style10}> 장바구니 </label>
            </Link>
          </Menu.Item>
          <Menu.Item key="3" style={style9}>
            <Link to="/BuyerMyPage/PaymentHistory">
              <label style={style10}> 결제 내역 </label>
            </Link>
          </Menu.Item>
          <Menu.Item key="4" style={style9}>
            <Link to="/BuyerMyPage/PaymentHistoryGraph">
              <label style={style10}> 결제 금액 그래프 </label>
            </Link>
          </Menu.Item>
          <Menu.Item key="5" style={style9}>
            <Link to="/BuyerMyPage/BusinessApplication">
              <label style={style10}> 사업자 신청 </label>
            </Link>
          </Menu.Item>
          <Menu.Item key="6" style={style9}>
            <Link to="/BuyerMyPage/BusinessApplicationList">
              <label style={style10}> 사업자 신청 확인 </label>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </Layout>
  );
}
export default BuyerMyPage;
