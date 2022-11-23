import { Button, Modal } from "antd";
import React, { useState } from "react";
import Order from "./Order";
import {cloudServerIP} from "../../App"

const OrderModal = ({ price, productId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const btnStyle = {
    width: "8rem",
    margin: "1rem",
  };
  const showModal = () => {
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
        footer={false}
      >
        <Order price={price} productId={productId} handleCancel={handleCancel}></Order>
      </Modal>
    </>
  );
};

export default OrderModal;
