import { Button, Checkbox, Form, Input } from "antd";
import SignUpModal from "../signUp/SignUpModal";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/userState";

import { useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import axios from "axios";
import {cloudServerIP} from "../../App"

function Login({ onCancel }) {
  const navigate = useNavigate;
  const [user, setUser] = useRecoilState(userState);

  const style = {
    display: "flex",
    margin: "3rem",
    width: "100%",
    textAlign: "center",
  };
  const onFinish = (values) => {
    var object = new Object(values);

    const json = JSON.stringify(object);
    axios
      .post(cloudServerIP + "/api/user/login", json, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          setUser(response.data.result);
        } else {
          console.log("로그인실패");
        }
      })

      .then(() => {
        onCancel();
      })
      .catch((error) => alert(error.response.data.msg));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
//
//
  return (
    <Form
      name="basic"
      style={style}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="loginform"
    >
      <div>
        <Form.Item
          label="loginId"
          name="loginId"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
      </div>
      <div>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            로그인
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <SignUpModal></SignUpModal>
        </Form.Item>
      </div>
    </Form>
  );
}
export default Login;
