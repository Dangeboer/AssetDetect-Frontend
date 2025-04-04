import React, { useState } from "react";
import { Modal, Form, Input, Button, Radio } from "antd";
import { message } from "antd";
import { login, register } from "../utils";

const LoginRegisterModal = ({ visible, onClose, onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false); // 控制当前是登录还是注册模式，默认为登录
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // 提交表单逻辑
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const action = isRegister ? register : login;
      const role = isRegister ? values.role : null;

      // 执行注册或登录
      const token = isRegister
        ? await action(values.username, values.password, role)
        : await action(values.username, values.password);

      if (isRegister) {
        message.success("注册成功！");
        setIsRegister(false); // 注册成功后切换回登录模式
      } else if (token) {
        localStorage.setItem("token", token);
        message.success("登录成功！");
        onLoginSuccess(token);
      } else {
        message.error("登录失败，未获取到 token！");
      }
    } catch (error) {
      Modal.error({
        title: isRegister ? "注册失败" : "登录失败",
        content: isRegister ? "用户已存在" : "密码错误或用户不存在",
      });
    } finally {
      setLoading(false);
    }
  };

  // 切换登录/注册模式
  const handleSwitch = () => {
    setIsRegister(!isRegister);
    form.resetFields(); // 切换模式时重置表单
  };

  // 提取重复的表单项配置
  const renderFormItem = (label, name, rules, Component) => (
    <Form.Item label={label} name={name} rules={rules}>
      {Component}
    </Form.Item>
  );

  return (
    <Modal
      title={isRegister ? "注册" : "登录"}
      open={visible}
      onCancel={onClose}
      footer={null}
      onOk={() => form.submit()} // 支持点击“确定”提交
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        preserve={false}
      >
        {renderFormItem(
          "用户名",
          "username",
          [{ required: true, message: "请输入用户名!" }],
          <Input />
        )}

        {renderFormItem(
          "密码",
          "password",
          [{ required: true, message: "请输入密码!" }],
          <Input.Password />
        )}

        {isRegister &&
          renderFormItem(
            "角色",
            "role",
            [{ required: true, message: "请选择角色!" }],
            <Radio.Group>
              <Radio value="ROLE_USER">普通用户</Radio>
              <Radio value="ROLE_ADMIN">管理员</Radio>
            </Radio.Group>
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
