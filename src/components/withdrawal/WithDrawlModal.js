import { Button, Modal } from "antd";
import React, { useState } from "react";
import WithDrawl from "./WithDrawl.js";
import {cloudServerIP} from "../../App"

const  WithDrawlModal= () => {
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
        회원탈퇴
      </Button>
      <Modal
        title="비밀번호 재입력"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={false}
      >
        <WithDrawl onCancel={handleCancel}></WithDrawl>
      </Modal>
    </>
  );
};

export default WithDrawlModal;
