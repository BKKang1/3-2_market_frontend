import { Button, Modal } from "antd";
import React, { useState } from "react";
import Login from "./Login";
const LoginModal = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const style = { display: "none" };
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        로그인
      </Button>
      <Modal
        title="로그인"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Login></Login>
      </Modal>
    </>
  );
};

export default LoginModal;
