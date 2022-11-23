import { DeleteOutlined, ToolOutlined } from "@ant-design/icons";
import { Avatar, List, Space, Button, Popconfirm, message } from "antd";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import SellerCreateWriting from "./SellerCreateWriting";
import SellerMyPage from "./SellerMyPage";
import { useNavigate } from "react-router-dom";
import {cloudServerIP} from "../../App"

const imgStyle = {
  width: "200px",
  height: "220px",
};

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}

    {text}
  </Space>
);
function RegisteredProduct() {
  const navigate = useNavigate();
  const [serverData, setServerData] = useState();
  const [pageNum, setPageNum] = useState(1);
  const [totalItemNum, setTotalItemNum] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {
    axios
      .get(
        cloudServerIP + `/api/seller-mypage/sale-list?pageSize=${pageSize}&pageNum=${pageNum}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      )
      .then((response) => {
        const data = response.data;

        setServerData(data.result);
        setTotalItemNum(data.lastPageNum * pageSize);
        console.log("serverdata: ", data);
      })
      .catch((error) => alert(error.response.data.msg));
  }, [pageNum, pageSize]);
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
  const btnStyle = {
    textAlign: "right",
  };
  const refreshPage = () => {
    navigate(0);
  };
  const confirm = (props) => {
    console.log("c", props);
    axios
      .delete(cloudServerIP + `/api/products/${props}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      })
      .then((response) => {
        message.success(response.data.result.msg);
      })
      .then(() => {
        refreshPage();
      })
      .catch((error) => alert(error.response.data.msg));
  };
  const cancel = (e) => {
    console.log(e);
    message.error("삭제 취소");
  };
  const doModify = () => {};
  return (
    <div>
      <SellerMyPage />
      <div className="list-box" style={style0}>
        <div style={style1}>
          등록된 상품
          <div style={btnStyle}>
            <Button>
              <Link to="./../SellerCreateWriting">상품등록 </Link>{" "}
            </Button>
          </div>
        </div>

        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page, size) => {
              setPageSize(size);
              setPageNum(page);
            },
            total: totalItemNum,
            pageSize: pageSize,
            pageSizeOptions: [5, 10],
          }}
          dataSource={serverData}
          renderItem={(item) => {
            return (
              <List.Item
                key={item.productId}
                actions={[
                  <Popconfirm
                    title="삭제 하시겠습니까?"
                    onConfirm={() => {
                      confirm(item.productId);
                    }}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <a href="#">
                      {" "}
                      <IconText icon={DeleteOutlined} text={"삭제"} />
                    </a>
                  </Popconfirm>,
                 
                    <Link to={`./../SellerModifyWriting/${item.productId}`}>
                      {" "}
                      <IconText icon={ToolOutlined} text="수정" />
                    </Link>
             
                ]}
                extra={
                  <img
                    width={272}
                    alt="logo"
                    src={cloudServerIP + item.signatureImgSrc}
                    style={imgStyle}
                  />
                }
              >
                <List.Item.Meta
                  title={
                    <p>
                      <Link to={`../shop-list/shop-detail/${item.productId}`}>
                        {""}
                        {item.productName}
                      </Link>
                    </p>
                  }
                  description={item.item}
                />
                <h3>가격 : {item.price} 원 </h3>
                <h3>등록일 : {item.createdDate} </h3>
              </List.Item>
            );
          }}
        />
      </div>
    </div>
  );
}

export default RegisteredProduct;
