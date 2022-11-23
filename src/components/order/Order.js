import { Button, Form, Input, InputNumber } from "antd";
import Address from "./Address";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {cloudServerIP} from "../../App"

function Order({ price, productId, handleCancel }) {
  const [form] = Form.useForm();
  const [address, setAddress] = useState(null); // 주소
  const [jibun, setJibun] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [detailAddress, setDetailAddress] = useState(null);
  const [totalPrice, setTotalPrice] = useState(price);
  const style = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "left",
  };
  useEffect(() => {
    axios
      .get(cloudServerIP + "/api/order/address",{withCredentials: true})
      .then((response) => {
        console.log(response.data.result);
        setAddress(response.data.result.road);
        setJibun(response.data.result.jibun);
        setZipCode(response.data.result.zipcode);

        form.setFieldsValue({
          detailAddress: response.data.result.detailAddress,
        });
      })
      .catch((error) => {
        alert(error.response.data.msg);
        handleCancel();
      });
  }, []);

  const onFinish = (values) => {
    var object = new Object();
    object.orderProducts = [{ productId: productId, count: values.count }];
    object.road = address;
    object.detailAddress = values.detailAddress;
    object.jibun = jibun;
    object.zipcode = parseInt(zipCode, 10);
    const json = JSON.stringify(object);
    console.log(json);

    axios
      .post(cloudServerIP + "/api/order", json, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      })
      .then((response) => {
        alert(response.data.result.msg);
        handleCancel();
      })

      .catch((error) => alert(error.response.data.msg));
  };

  const onValuesChange = (values) => {
    if (values.count) setTotalPrice(values.count * price);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        form={form}
        name="basic"
        style={style}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        onValuesChange={onValuesChange}
      >
        <Form.Item
          label="totalPrice"
          rules={[{ required: true, message: "Please input your count!" }]}
        >
          <Input value={totalPrice} readOnly />
        </Form.Item>
        <Form.Item
          label="count"
          name="count"
          initialValue={1}
          rules={[{ required: true, message: "Please input your count!" }]}
        >
          <InputNumber min={1} />
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
        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button type="primary" htmlType="submit">
            결제하기
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
export default Order;
