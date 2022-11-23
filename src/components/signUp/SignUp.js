import { Button, Checkbox, Form, Input } from "antd";
import Address from "../order/Address";
import { useState } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import {cloudServerIP} from "../../App"

function SignUp({ onCancel }) {
  const [address, setAddress] = useState(null); // 주소
  const [jibun, setJibun] = useState(null);
  const [zipCode, setZipCode] = useState(null);

  const style = {
    display: "flex",
    flexDirection: "column",

    width: "100%",
    flexWrap: "wrap",
    alignItems: "left",
  };
  const btnStyle = {
    marginTop: "1rem",
  };
  const onFinish = (values) => {
    let object = new Object(values);
    console.log(object);
    object.road = address;
    object.jibun = jibun;
    object.zipcode = parseInt(zipCode, 10);
    const json = JSON.stringify(object);
    console.log(json);
    axios
      .post(cloudServerIP + "/api/user", json, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => alert(response.data.result.msg))
  
      .catch((error) => alert(error.response.data.msg))
      .then(() => onCancel());
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      style={style}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="loginform"
    >
      <div>
        <Form.Item
          label="name"
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="loginId"
          name="loginId"
          rules={[{ required: true, message: "Please input your Id!" }]}
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

        <Form.Item
          label="birth"
          name="birth"
          rules={[{ required: true, message: "Please input your birth!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="phoneNumber"
          name="phoneNumber"
          rules={[{ required: true, message: "Please input your phone" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="road"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input value={address} readOnly />
        </Form.Item>
        <Form.Item
          label="jibun"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input value={jibun} readOnly />
        </Form.Item>
        <Form.Item
          label="detailAddress"
          name="detailAddress"
          rules={[
            { required: true, message: "Please input your detailAddress!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="zipcode"
          rules={[{ required: true, message: "Please input your zipCode!" }]}
        >
          <Input value={zipCode} readOnly />
        </Form.Item>
        <Address
          setAddress={setAddress}
          setZipCode={setZipCode}
          setJibun={setJibun}
        />
        <Form.Item style={btnStyle}>
          <Button type="primary" htmlType="submit">
            회원가입
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
export default SignUp;
