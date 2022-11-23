import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import React from "react";
import ShopList from "./ShopList";
import ShopCascader from "./ShopCascader";
import ShopSelect from "./ShopSelect";
import { useRef, useState } from "react";
import ShopSearch from "./ShopSearch";
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);
const CasStyle = {
  marginTop: "2rem",
  marginLeft: "2rem",
};
const style = {
  marginTop: "2rem",
  marginRight: "2rem",
  textAlign: "right",
};
const style2 = {
  position: 'fixed',
  left: '20px',
};

const Shop = () => {
  const casId = useRef(["", "", "", ""]);
  const selId = useRef("latest");
  const searchText = useRef("");
  const [serverData, setServerData] = useState();
  return (
    <div>
      <div style={CasStyle}>
        <ShopCascader casId={casId} />
        <ShopSelect selId={selId}></ShopSelect>
      </div>

      <div style={style}>
        <Space direction="vertical">
          <ShopSearch
            casId={casId}
            selId={selId}
            searchText={searchText}
            serverData={serverData}
            setServerData={setServerData}
          ></ShopSearch>
        </Space>
      </div>

      <ShopList
        casId={casId}
        selId={selId}
        serverData={serverData}
        setServerData={setServerData}
      ></ShopList>
    </div>
  );
};

export default Shop;
