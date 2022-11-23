import { Avatar, Button, Comment, Form, Input, List, Rate } from "antd";
import moment from "moment";
import React, { useState } from "react";
import {cloudServerIP} from "../../App"

const { TextArea } = Input;

function Editor({ onChange, onSubmit, submitting, value, count, setCount }) {
  const onChangeStar = (value) => {
    setCount(value);
  };

  return (
    <Form>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        {" "}
        <Rate allowHalf onChange={onChangeStar} value={count}></Rate>
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          Add Comment
        </Button>
      </Form.Item>
    </Form>
  );
}
export default Editor;
