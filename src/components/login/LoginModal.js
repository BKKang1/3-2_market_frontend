import { Button, Modal } from "antd";
import React, { useState, useEffect } from "react";
import Login from "./Login";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/userState";

import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import axios from "axios";
import { useResetRecoilState } from "recoil";
import {cloudServerIP} from "../../App"
//axios.defaults.withCredentials = true;

const LoginModal = () => {
  const [user, setUser] = useRecoilState(userState);
  

  const navigate = useNavigate;
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const style = { display: "none" };
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
    navigate("/");
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const logout = () => {
    console.log("logout btn is clicked");
    axios
      .get(cloudServerIP + "/api/user/logout", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      },)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          setUser(null);
          alert(response.data.result.msg);
        }
      });
  };
  useEffect(() => {
    axios
      .get(cloudServerIP + "/api/user/login-check", {
        headers: { "Content-Type": "application/json" },
        withCredentials : true
      })
      .then(() => {})
      .catch((error) => {
        if (error.response.data.status===401&& user !== null) {
          setUser(null);
        }
      });
  }, []);
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          user === null ? showModal() : logout();
        }}
      >
        {user === null ? "로그인" : `${user.name}님 로그아웃 `}
      </Button>
      <Modal
        title="로그인"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        destroyOnClose="true"
        footer={false}
      >
        <Login onCancel={handleCancel}></Login>
      </Modal>
    </>
  );
};

export default LoginModal;
