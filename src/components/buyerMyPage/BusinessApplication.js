import React, { useEffect, useState, useRef } from "react";
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
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import BuyerMyPage from "../buyerMyPage/BuyerMyPage";
import {cloudServerIP} from "../../App"

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
  
function BusinessApplication(){
  const [sigList, setSigList] = useState([]);
  const id = useRef(0);
  const imgStyle = {
    textAlign: "center",
    marginTop: "2rem",
  };

  const [options, setOptions] = useState(null);

  const navigate = useNavigate();

  const refreshPage = () => {
    navigate(0);
  };

  const onFinish = (values) => {
    if (sigList.length === 0) {
      alert("빈 공간이 있습니다");
      return;
    }
    const formData = new FormData();
    //console.log("id", id.current);
    //formData.append("kindGradeId", id.current);
    formData.append("businessName", values.businessName);
    formData.append("businessNumber", values.businessNumber);

    sigList.forEach((file) => {
      console.log(file);
      formData.append("img", file);
    });

    for (let key of formData.keys()) {
      console.log(key, ":", formData.get(key));
    }

    axios
      .post(`${cloudServerIP}/api/business`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials : true
      },
      { withCredentials: true })
      .then((response) => {
        console.log(response.data); 
        alert(response.data.result.msg);
        navigate(0);
      })
      .catch((error) => {
        alert(error.response.data.msg);
        navigate(0);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const style = { margin: "2rem" };

  const style0 = {
    marginLeft: "20%",
    marginRight: "20%",
    borderTop: "2px solid",
  };

  const style1 = {
    paddingTop: "5%",
    paddingBottom: "5%",
    fontSize: "25px",
    fontWeight: "700",
    color: "black",
  };

  return (
    <div>
      <BuyerMyPage></BuyerMyPage>
      <div className="box"style={style0}>
        <div className="business-detail" style={style1}>사업자 등록 신청</div>
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
          <Form.Item label="상호명" name="businessName">
            <span>
              <Input />
            </span>
          </Form.Item>
          <Form.Item label="사업자 번호" name="businessNumber">
            <span>
              <Input />
            </span>
          </Form.Item>
          <Form.Item label="사진" name="img">
            <Upload
              beforeUpload={(file) => {
                if (sigList.length < 1) {
                  console.log("file", file);
                  setSigList((sigList) => sigList.concat(file));
                }
                return false; // 파일 선택시 바로 업로드 하지 않고 후에 한꺼번에 전송하기 위함
              }}
              listType="picture"
              maxCount={1.5}
              onPreview={() => false}
              onRemove={(file) => {
                setSigList(sigList.filter((i) => i.uid !== file.uid));
              }}
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
                신청
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}
export default BusinessApplication;