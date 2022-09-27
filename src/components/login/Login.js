import { Button, Checkbox, Form, Input } from "antd";
import SignUpModal from "../signUp/SignUpModal";

function Login() {
  const style = {
    display: "flex",
    margin: "3rem",
    width: "100%",
    textAlign: "center",
  };
  const onFinish = (values) => {
    return <div>로그인 완료</div>;
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      style={style}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="loginform"
    >
      <div>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember</Checkbox>
        </Form.Item>
      </div>
      <div>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              window.alert("로그인 성공");
            }}
          >
            로그인
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <SignUpModal></SignUpModal>
        </Form.Item>
      </div>
    </Form>
  );
}
export default Login;