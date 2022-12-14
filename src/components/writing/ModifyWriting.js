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
import ImageUpload from "./ImgaeUpload";
import { Typography, Spin } from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SellerModifyWriting from "../sellerMyPage/SellerModifyWriting";
import {cloudServerIP} from "../../App"

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

function ModifyWriting() {
  const productId = useParams().productId;
  const [fileList, setFileList] = useState([]);
  const temp = useRef([]);
  const [sigList, setSigList] = useState([]);
  const [url, setUrl] = useState(
    "https://previews.123rf.com/images/redrockerz/redrockerz1303/redrockerz130300043/18435157-%EA%B8%B0%EB%8B%A4%EB%A6%AC%EB%8A%94-%EC%82%AC%EB%9E%8C.jpg"
  );
  const [unit, setUnit] = useState(null);
  const id = useRef(0);
  const imgStyle = {
    textAlign: "center",
    marginTop: "2rem",
  };
  const [ori, setOri] = useState({
    category: null,
    kindGradeId: null,
    productName: null,
    price: 0,
    info: null,
    retailUnit: null,
    ordinalImgList: [
      {
        src: null,
        name: null,
      },
      {
        src: null,
        name: null,
      },
    ],
    signatureImg: {
      url: null,
      name: null,
    },
  });
  const [def, setDef] = useState({
    productName: null,
  });
  const [form] = Form.useForm();
  const [options, setOptions] = useState(null);

  const navigate = useNavigate("/SellerMyPage/RegisteredProduct");

  const refreshPage = () => {
    navigate("/SellerMyPage/RegisteredProduct");
  };
  const urlToObject = async (props) => {
    let tempArr = [];
    for (let i = 0; i < props.length; i++) {
      if (props[i].src && fileList.length < props.length) {
        const response = await fetch(`../../${props[i].src}`);
        const blob = await response.blob();
        const file = new File([blob], props[i].name, { type: blob.Image });
        tempArr = tempArr.concat(file);
        console.log(file);
      }
    }
    setFileList(tempArr);
  };
  const urlToSig = async (props) => {
    if (props.src) {
      const response = await fetch(`../../${props.src}`);
      const blob = await response.blob();
      const file = new File([blob], props.name, { type: blob.Image });
      setSigList(sigList.concat(file));

      console.log(file);
    }
  };

  useEffect(() => {
    axios
      .get(cloudServerIP + `/api/products/update/${productId}`,{withCredentials: true})
      .then((response) => {
        console.log(response.data.result);
        setOri(response.data.result);
        //setDef(response.data.result.productName);
      })
      .then(() => {
        console.log(def);
 
      })
      .then(()=>{
        setIsLoading(false);
      })
      .catch((error) => alert(error.response.data.msg));

    axios.get(cloudServerIP + "/api/item-category",{withCredentials: true}).then((response) => {
      console.log(response.data.category);
      setOptions(response.data.category);
    });
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      ?????????: ori.productName,
      ??????: ori.price,
      ??????: ori.info,
      ??????: ori.category,
    });

    urlToObject(ori.ordinalImgList);

    urlToSig(ori.signatureImg);
    setId(ori.kindGradeId);
  }, [ori]);

  const onChange = (value) => {
    id.current = value[value.length - 1];
    axios
      .get(cloudServerIP + `/api/item-category/${id.current}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      })
      .then((response) => {
        console.log(response.data.result);
        response.data.result.criteriaSrc
          ? setUrl(`../../${response.data.result.criteriaSrc}`)
          : setUrl(null);

        setUnit(response.data.result.retailUnit);
      })
      .catch((error) => console.log(error));
  };

  const setId = (value) => {
    id.current = value;
    axios
      .get(cloudServerIP + `/api/item-category/${id.current}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      })
      .then((response) => {
        console.log(response.data.result);
        response.data.result.criteriaSrc
          ? setUrl(`../../${response.data.result.criteriaSrc}`)
          : setUrl(null);

        setUnit(response.data.result.retailUnit);
      })
      .catch((error) => console.log(error));
  };

  const onFinish = (values) => {
    if (sigList.length === 0 || fileList.length === 0) {
      alert("??? ????????? ????????????");
      return;
    }
    const formData = new FormData();
    console.log("hihihiuhiuhi", values);
    console.log("id", id.current);
    formData.append("kindGradeId", id.current);
    formData.append("productName", values.?????????);
    formData.append("price", values.??????);
    formData.append("info", values.??????);

    sigList.forEach((file) => {
      console.log(file);
      formData.append("sigImg", file);
    });

    fileList.forEach((file) => {
      console.log(file);
      formData.append("img", file);
    });
    for (let key of formData.keys()) {
      console.log(key, ":", formData.get(key));
    }

    axios
      .post(cloudServerIP + `/api/products/update/${productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      })
      .then((response) => alert(response.data.result.msg))
      .then(() => {
        refreshPage();
      })
      .catch((error) => alert(error.response.data.msg));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [isloading, setIsLoading] = useState(true);
  const style = { margin: "2rem" };
  return (
    <Spin spinning={isloading} size="large">
      <div>
        <div style={imgStyle}>
          <Image width={600} height={200} src={url} />
          <h2> ?????? {unit || ori.retailUnit}</h2>
        </div>

        <Form
          form={form}
          name="form-name"
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
          initialValues={ori}
        >
          <Form.Item label="??????" name="??????">
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
          <Form.Item label="?????????" name="?????????">
            <Input />
          </Form.Item>
          <Form.Item label="??????" name="??????">
            <InputNumber />
          </Form.Item>
          <Form.Item label="??????" name="??????">
            <TextArea rows={10} placeholder="maxLength is 6" maxLength={10} />
          </Form.Item>
          <Form.Item label="???????????????" name="???????????????">
            <Upload
              beforeUpload={(file) => {
                if (sigList.length < 1) {
                  console.log("file", file);
                  setSigList((sigList) => sigList.concat(file));
                }
                return false; // ?????? ????????? ?????? ????????? ?????? ?????? ?????? ???????????? ???????????? ??????
              }}
              fileList={sigList}
              listType="text"
              maxCount={1.5}
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
          <Form.Item label="?????????" name="?????????">
            <Upload
              fileList={fileList}
              beforeUpload={(file) => {
                console.log("file", file);
                if (sigList.length <= 4) setFileList(fileList.concat(file));
                return false; // ?????? ????????? ?????? ????????? ?????? ?????? ?????? ???????????? ???????????? ??????
              }}
              listType="text"
              maxCount={5}
              onRemove={(file) => {
                setFileList(fileList.filter((i) => i.uid !== file.uid));
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
            <Form.Item label="??????">
              <Button type="primary" htmlType="submit">
                ??? ??????
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Spin>
  );
}

export default ModifyWriting;
