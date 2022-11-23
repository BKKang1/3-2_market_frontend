import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from "@ant-design/icons";
import { Avatar, Comment, Tooltip, Button } from "antd";
import React, { createElement, useState } from "react";
import CommentUpdateModal from "./CommentUpdateModal";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/userState.js";
import {cloudServerIP} from "../../App"

const CommentOfList = (props) => {
  const ndisplayBtn={
    display:"none"
  }

  const [user, setUser] = useRecoilState(userState);

  const actions = [
    <span>{props.comment.rate}</span>,

    <Button onClick={() => props.remove(props.comment.uid) }style={user===null?null:user.id===props.comment.userId? null:ndisplayBtn}>삭제</Button>,

    <span>
      <CommentUpdateModal
        comment={props.comment}
        comments={props.comments}
        setComments={props.setComments}
        remove={props.remove}
      />
    </span>,
  ];
  return (
    <Comment
      uid={props.comment.uid}
      actions={actions}
      author={<a>{props.comment.author}</a>}
      avatar={<Avatar src={props.comment.avatar} alt="Han Solo" />}
      content={<p>{props.comment.content}</p>}
      datetime={
        <Tooltip>
          <p>{props.comment.datetime}</p>
        </Tooltip>
      }
    />
  );
};

export default CommentOfList;
