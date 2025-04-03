import React, { useState } from "react";
import { Modal, Form, Input, Button, Radio, message } from "antd";
import { login, register } from "../utils";

const LoginRegisterModal = ({ visible, onClose, onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSwitch = () => {
    setIsRegister(!isRegister);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (isRegister) {
        // 注册逻辑
        await register(values.username, values.password, values.role);
        message.success("注册成功！");
        setIsRegister(false); // 注册成功后切换回登录模式
      } else {
        // 登录逻辑
        const token = await login(values.username, values.password);
        localStorage.setItem("token", token);
        message.success("登录成功！");
        onLoginSuccess();
      }
    } catch (error) {
      message.error(isRegister ? "注册失败！" : "登录失败！");
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