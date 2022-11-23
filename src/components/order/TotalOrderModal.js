import { Button, Modal } from "antd";
import React, { useState } from "react";
import TotalOrder from "./TotalOrder";
import {cloudServerIP} from "../../App"

const OrderModal = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const btnStyle = {
    width: "8rem",
    margin: "1rem",
  };
  const showModal = () => {
    console.log(props.data);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" style={btnStyle} onClick={showModal}>
        구매하기{" "}
      </Button>
      <Modal
        destroyOnClose="true"
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <TotalOrder props = {props.data}></TotalOrder>
      </Modal>
    </>
  );
};

export default OrderModal;