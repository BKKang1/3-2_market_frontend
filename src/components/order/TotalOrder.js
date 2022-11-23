import { Button, Form, Input, InputNumber } from "antd";
import Address from "./Address";
import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {cloudServerIP} from "../../App"

function TotalOrder(props) {
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [address, setAddress] = useState(null); // 주소
    const [jibun, setJibun] = useState(null);
    const [zipCode, setZipCode] = useState(null);
    const [detailAddress, setDetailAddress] = useState(null);
    const [totalPrice, setTotalPrice] = useState(null);

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
          .get(cloudServerIP + "/api/order/address")
          .then((response) => {
            console.log(response.data.result);
            setAddress(response.data.result.road);
            setJibun(response.data.result.jibun);
            setZipCode(response.data.result.zipcode);

            let tempPrice = 0;
            for(let i = 0; i < props.props.length; i++){
                tempPrice = tempPrice + props.props[i].price;
            }
            //console.log(props.props.length);
            setTotalPrice(tempPrice);

            form.setFieldsValue({
              detailAddress: response.data.result.detailAddress,
            });
          })
          .catch((error) => alert(error.response.data.msg));
      }, []);

    const onFinish = (values) => {
        var object = new Object();
        let arr =[];
        for(let i = 0; i < props.props.length; i++){
            arr = arr.concat({ productId: props.props[i].productId, count: props.props[i].count });
        }
        object.orderProducts = arr;
        object.road = address;
        object.detailAddress = values.detailAddress;
        object.jibun = jibun;
        object.zipcode = parseInt(zipCode, 10);
        const json = JSON.stringify(object);
        console.log(json);
    
        axios
          .post(cloudServerIP + "/api/order", json, {
            headers: { "Content-Type": "application/json" },
          })
          .then((response) => alert(response.data.result.msg))
    
          .catch((error) => alert(error.response.data.msg),navigate(0));
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
          >
            <Form.Item
              label="totalPrice"
              rules={[{ required: true, message: "Please input your count!" }]}
            >
              <Input value={totalPrice} readOnly />
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
export default TotalOrder;