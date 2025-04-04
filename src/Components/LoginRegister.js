import React, { useState } from "react";
import { Modal, Form, Input, Button, Radio } from "antd";
import { message } from "antd";
import { login, register } from "../utils";

const LoginRegisterModal = ({ visible, onClose, onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false); // 控制当前是登录还是注册模式，默认为登录
  const [loading, setLoading] = useState(false);

  // 用来切换 isRegister 状态，改变是显示登录还是注册表单，其实就是反转 isRegister 状态
  const handleSwitch = () => {
    setIsRegister(!isRegister);
  };

  // 表单提交的处理函数，接收表单的 values 作为参数
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (isRegister) {
        // 注册逻辑
        console.log("注册操作开始");
        await register(values.username, values.password, values.role);
        console.log("注册操作完成");
        message.success("注册成功！");
        setIsRegister(false); // 注册成功后切换回登录模式
      } else {
        // 登录逻辑
        const token = await login(values.username, values.password);

        // console.log("Token from login:", token); // 确保 token 是有效的

        if (token) {
          localStorage.setItem("token", token); // 存储 token
          // console.log(
          //   "Stored token in localStorage:",
          //   localStorage.getItem("token")
          // ); // 确认存储
          message.success("登录成功！");
          onLoginSuccess(token);
        } else {
          message.error("登录失败，未获取到 token！");
        }
      }
    } catch (error) {
      console.log("注册失败");
      Modal.error({
        title: isRegister ? "注册失败" : "登录失败",
        content: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={isRegister ? "注册" : "登录"}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input.Password />
        </Form.Item>

        {isRegister && (
          <Form.Item
            label="角色"
            name="role"
            rules={[{ required: true, message: "请选择角色!" }]}
          >
            <Radio.Group>
              <Radio value="ROLE_USER">普通用户</Radio>
              <Radio value="ROLE_ADMIN">管理员</Radio>
            </Radio.Group>
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            {isRegister ? "注册" : "登录"}
          </Button>
        </Form.Item>
      </Form>

      <div style={{ textAlign: "center" }}>
        <Button type="link" onClick={handleSwitch}>
          {isRegister ? "已有账号？点击登录" : "没有账号？点击注册"}
        </Button>
      </div>
    </Modal>
  );
};

export default LoginRegisterModal;
