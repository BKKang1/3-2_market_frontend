import { Button, Modal } from "antd";
import React, { useState } from "react";
import SignUp from "./SignUp.js";
import {cloudServerIP} from "../../App"

const SignUpModal = () => {
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
        회원가입
      </Button>
      <Modal
        title="회원가입"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={false}
      >
        <SignUp onCancel={handleCancel}></SignUp>
      </Modal>
    </>
  );
};

export default SignUpModal;
