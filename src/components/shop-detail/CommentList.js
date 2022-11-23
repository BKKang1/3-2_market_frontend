import { Avatar, Button, Form, Input, List, Skeleton } from "antd";
import CommentOfList from "./CommentOfList";
import moment from "moment";
import React, { useState } from "react";
import {cloudServerIP} from "../../App"
const { TextArea } = Input;

function CommentList({ comments, remove, update, setComments }) {
  return (
    <List
      dataSource={comments}
      itemLayout="horizontal"
      renderItem={(props) => (
        <CommentOfList
          comments={comments}
          setComments={setComments}
          comment={props}
          remove={remove}
          update={update}
        ></CommentOfList>
      )}
    />
  );
}
export default CommentList;
