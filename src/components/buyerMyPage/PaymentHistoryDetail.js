import "antd/dist/antd.min.css";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import axios from 'axios';
import { Avatar, Divider, List, Skeleton, Button } from 'antd';
import {useNavigate} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import {cloudServerIP} from "../../App"

const style0 = {
    //backgroundColor: "#95a5a688",
};

const style1 = {
    fontSize: "25px",
    fontWeight: "500",
};

const style2= {
  fontSize: "20px",
  fontWeight: "500",
};

const style3= {
    display: "flex",
    marginTop: "5%",
};
const style4= {
    display: "flex",
    marginTop: "5%",
    color: "red",
    fontSize: "20px",
};

const imgStyle = {
    width: "200px",
    height: "220px",
};

function PaymentHistoryDetail(props){
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    console.log(props.props);

    useEffect(() => {
        setData(props.props);
    }, []);

    const deletOrder = (e) => {
        console.log(e);
        axios
        .delete(cloudServerIP + `/api/order/${e}`, {
            headers: { "Content-Type": "application/json" },
            withCredentials : true
        })
        .then((response) => {
            alert(response.data.result.msg);
            navigate(0);
            //window.location.reload();
        })
        .catch((err) => {console.log(err); alert(err.reponse.data.msg);});
    };

    return(
        <div style = {style0}>
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
            onChange: (page) => {
                console.log(page);
            },
            pageSize: 10,
            }}
            dataSource={data}
            renderItem={(item) => {
                return (
                    <List.Item
                        key={item.productId}
                        extra={
                            <img
                                width={272}
                                alt="logo"
                                src={cloudServerIP + item.path}
                                style={imgStyle}
                            />
                        }
                    >
                    <List.Item.Meta
                    title={<span style = {style1}>{item.productName}</span>}
                    description={<span style = {style2}>{item.price}</span>}
                    />
                    {item.count + "개"}
                    {(item.status == "CANCEL") && <span style = {style4}>주문 취소됨</span>}
                    {(item.status == "ORDER") && <Button type="button" style = {style3} onClick = {() => deletOrder(item.orderProductId)}>
                            주문 취소
                        </Button>
                    }
                    </List.Item>
                )
            }}
        />
    </div>
    );
}
export default PaymentHistoryDetail;