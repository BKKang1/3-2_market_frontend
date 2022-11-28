import { Layout, Menu } from "antd";
import { location, useState, useEffect } from "react";
import LoginModal from "../login/LoginModal";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Title from "../main/Title";
import { userState } from "../../recoil/userState";
import { useRecoilState } from "recoil";
import axios from "axios";
import {cloudServerIP} from "../../App"

function MainLayout() {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  let [myPage, setMyPage] = useState("/");
  const refreshPage = () => {
    navigate(0);
  };
  useEffect(() => {
    console.log(user);
    if (user == null) {
      setMyPage("/");
    } else if (user.userType == "SELLER") {
      setMyPage("/SellerMyPage");
    } else if (user.userType == "BUYER") {
      setMyPage("/BuyerMyPage");
    } else if (user.userType == "ADMIN") {
      setMyPage("/ManagerMyPage");
    }
  }, [user]);
  const option = (e) => {
    if (user == null) {
      alert("로그인해주십시오.");
      navigate(0);
    }
  };
  const { Header, Content, Sider } = Layout;
  const style = {
    marginTop: "3rem",
    marginRight: "3rem",
  };
  return (
    <Layout>
      <div className="titlewithlogin">
        <div onClick={refreshPage}>
          <Title></Title>
        </div>

        <div className="login" style={style}>
          <LoginModal />
        </div>
      </div>

      <Header className="header">
        <div className="logo"></div>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="10">
            <Link to="/">
              <label> 메인 </label>
            </Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to="/marketCondition">
              <label> 시세</label>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/shop-list">
              <label> 농산물 </label>
            </Link>
          </Menu.Item>
          <Menu.Item key="3" onClick={option}>
            <Link to={myPage}>
              <label> 마이페이지 </label>
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
}
export default MainLayout;
