import { Avatar, Button, Comment, Form, Input, List, Rate } from "antd";
import moment from "moment";
import React, { useState, useEffect } from "react";
import CommentList from "./CommentList.js";
import Editor from "./Editor.js";
import { RestOutlined, FormOutlined } from "@ant-design/icons";
import uuid from "react-uuid";
import { useRecoilState_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import { resolveOnChange } from "antd/lib/input/Input.js";
import { json } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {cloudServerIP} from "../../App"

const { TextArea } = Input;

const ReviewWriting = ({
  comments,
  setComments,
  comment,
  remove,
  productNum,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState(
    comment != null ? comment.content.props.children : ""
  );
  const [count, setCount] = useState(
    comment != null ? comment.rate.props.value : ""
  );

  const navigate = useNavigate();

  const refreshPage = () => {
    navigate(0);
  };

  const style = {
    textAlign: "left",
  };
  const date = new Date();
  let [uid, setUid] = useState(uuid);

  const handleSubmit = async () => {
    var object = new Object();

    object.rate = count;
    object.content = value;

    const json = JSON.stringify(object);
    console.log(json);
    console.log("commentddd", comment);
    if (comment) {
      axios
        .patch(cloudServerIP + `/api/review/${comment.uid}`, json, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        })
        .then((response) => {
          const data = response.data.result;
          console.log(data);
          alert(data.msg);
        })
        .then(() => {
          refreshPage();
        })
        .catch((error) => alert(error.response.data.msg));
    } else {
      axios
        .post(cloudServerIP + `/api/review/${productNum}`, json, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        })
        .then((response) => {
          const data = response.data.result;
          console.log(data);
          alert(data.msg);
        })
        .then(() => {
          refreshPage();
        })
        .catch((error) => alert(error.response.data.msg));
    }
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Comment
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
            count={count}
            setCount={setCount}
          />
        }
      />
    </>
  );
};

export default ReviewWriting;
