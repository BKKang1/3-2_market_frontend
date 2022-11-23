import { Avatar, Button, Comment, Form, Input, List, Rate } from "antd";

import moment from "moment";
import React, { useState, useEffect, useRef } from "react";
import CommentList from "./CommentList.js";
import Editor from "./Editor.js";
import { RestOutlined, FormOutlined } from "@ant-design/icons";
import ReviewWriting from "./ReviewWriting.js";
import CommentUpdateModal from "./CommentUpdateModal.js";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {cloudServerIP} from "../../App"

const { TextArea } = Input;
const style = {
  textAlign: "left",
};

const Review = ({ productNum }) => {
  const navigate = useNavigate();
  const refreshPage = () => {
    navigate(0);
  };
  const [comments, setComments] = useState([]);

  let tempArr = [];
  useEffect(() => {
    axios
      .get(cloudServerIP + `/api/review/${productNum}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        const data = response.data.result;
        console.log(data);
        let i;
        for (i = 0; i < data.length; i++) {
          let temp = {
            uid: 0,
            author: null,
            avatar: null,
            content: null,
            rate: null,
            datetime: null,
            userId: null,
          };
          console.log(data.length);
          console.log("chk", tempArr);
          console.log("i는", i);
          temp.uid = data[i].reviewId;
          temp.author = data[i].name;
          temp.avatar = "https://joeschmoe.io/api/v1/random";
          temp.content = <span style={style}>{data[i].content}</span>;
          temp.rate = <Rate allowHalf disabled value={data[i].rate}></Rate>;
          temp.datetime = data[i].createdDate;
          temp.userId= data[i].userId
          tempArr = tempArr.concat(temp);
          console.log("TEMP", temp);
          console.log("TEMP", tempArr);
        }
        if (tempArr) {
          setComments(tempArr);
          tempArr = null;
        }
      })
      .then(() => {
        console.log("TEMP", tempArr);

        console.log(comments);
      })
      .catch((error) => alert(error.response.data.msg));
  }, []);

  function remove(id) {
    axios
      .delete(cloudServerIP + `/api/review/${id}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        refreshPage();
      });
  }

  return (
    <>
      {
        <CommentList
          comments={comments}
          remove={remove}
          setComments={setComments}
        />
      }
      <ReviewWriting productNum={productNum} />
    </>
  );
};

export default Review;
