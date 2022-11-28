import { Button, Checkbox, Form, Input } from "antd";
import { useState } from "react";
import { userState } from "../../recoil/userState";
import axios from "axios";
import Password from "antd/lib/input/Password";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {cloudServerIP} from "../../App"

function WithDrawl({ onCancel }) {
  const [user, setUser] = useRecoilState(userState);
  const style = {
    display: "flex",
    flexDirection: "column",

    width: "100%",
    flexWrap: "wrap",
    alignItems: "left",
  };
  const btnStyle = {
    textAlign: "Right",
  };
  const navigate = useNavigate("/");

  const refreshPage = () => {
    navigate("/");
  };

  const loginCheck = () => {
    axios
      .get(cloudServerIP + "/api/user/login-check", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      })
      .then(() => {
       
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.data.status === 401 && user !== null) {
          setUser(null);
        }
      });
  };
  const onFinish = (values) => {
    // let object = new Object(values);
    //let json = JSON.stringify(object);

    //console.log(json);

    axios
      .delete(cloudServerIP + "/api/user", {
        data: { password: values.password },
        withCredentials: true
      })

      .then((response) => alert(response.data.result.msg))

      .then(() => onCancel())
      .then(() => {
        loginCheck();
      })
      .then(() => {
        refreshPage();
      })
      .catch((error) => console.log(error));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      style={style}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="loginform"
    >
      <div>
        <Form.Item
          label="password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item style={btnStyle}>
          <Button type="primary" htmlType="submit">
            탈퇴하기
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
export default WithDrawl;
