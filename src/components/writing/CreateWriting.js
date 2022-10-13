import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  Image,
  Upload,
} from "antd";
import ImageUpload from "./ImgaeUpload";
import { Typography } from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";
const { Title } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

function CreateWriting() {
  const [url, setUrl] = useState(
    "https://previews.123rf.com/images/redrockerz/redrockerz1303/redrockerz130300043/18435157-%EA%B8%B0%EB%8B%A4%EB%A6%AC%EB%8A%94-%EC%82%AC%EB%9E%8C.jpg"
  );
  const [unit, setUnit] = useState(null);
  const imgStyle = {
    textAlign: "center",
    marginTop: "2rem",
  };

  const [options, setOptions] = useState(null);

  useEffect(() => {
    axios.get("/api/item-category").then((response) => {
      console.log(response.data.category);
      setOptions(response.data.category);
    });
  }, []);

  const onChange = (value) => {
    var id = value[value.length - 1];
    console.log(value[value.length - 1]);
    axios
      .get(`/api/item-category/${id}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data.result);
        response.data.result.criteriaSrc
          ? setUrl(response.data.result.criteriaSrc)
          : setUrl(
              "https://previews.123rf.com/images/redrockerz/redrockerz1303/redrockerz130300043/18435157-%EA%B8%B0%EB%8B%A4%EB%A6%AC%EB%8A%94-%EC%82%AC%EB%9E%8C.jpg"
            );

        setUnit(response.data.result.retailUnit);
      })
      .catch((error) => console.log(error));
  };

  const onFinish = (values) => {
    axios
      .get("/gradeCriteria")
      .then((response) => {
        setUrl(response.data.path);
      })
      .catch((error) => console.log(error));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const style = { margin: "2rem" };
  return (
    <div>
      <div style={imgStyle}>
        <Image width={600} height={200} src={url} />
      </div>

      <Form
        name="basic"
        style={style}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        autoComplete="off"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="품목" name="품목">
          <Cascader
            options={options}
            //changeOnSelect
            onChange={onChange}
            fieldNames={{
              label: "name",
              value: "id",

              children: "category",
            }}
          />
        </Form.Item>

        <Form.Item label="가격" name="가격">
          <span>
            <InputNumber />

            <p> 단위 {unit}</p>
          </span>
        </Form.Item>
        <Form.Item label="설명" name="설명">
          <TextArea rows={10} placeholder="maxLength is 6" maxLength={10} />
        </Form.Item>
        <Form.Item
          label="대표이미지"
          name="대표이미지"
          valuePropName="filelist"
        >
          <Upload
            maxCount="1"
            action="k"
            beforeUpload="false"
            listType="picture-card"
          >
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="이미지" name="이미지" valuePropName="filelist">
          <Upload
            action="and.to"
            maxCount="5"
            multiple={true}
            beforeUpload="false"
            listType="picture-card"
          >
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        <div>
          <Form.Item label="제출">
            <Button type="primary" htmlType="submit">
              글 등록
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default CreateWriting;
