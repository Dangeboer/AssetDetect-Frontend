import React, { useState } from "react";
import { Table, Button, Modal } from "antd";

const AssetDetection = ({ isLoggedIn, showModal }) => {
  const [data, setData] = useState([
    {
      key: "1",
      type: "服务器",
      name: "服务器 A",
      address: "192.168.1.1",
      method: "Ping",
      status: "未知",
    },
    {
      key: "2",
      type: "路由器",
      name: "路由器 B",
      address: "192.168.1.2",
      method: "Ping",
      status: "未知",
    },
  ]);

  const handleDetection = async () => {
    if (!isLoggedIn) {
      Modal.warning({
        title: "需要登录",
        content: "请先登录再进行资产探测",
        okText: "去登录",
        onOk: () => showModal(), // 点击确定后打开登录框
      });
      return;
    }

    // 模拟 API 调用，更新资产状态
    const updatedData = data.map((item) => ({
      ...item,
      status: Math.random() > 0.5 ? "存活" : "离线",
    }));
    setData(updatedData);
  };

  const columns = [
    { title: "资产类型", dataIndex: "type", key: "type" },
    { title: "资产名称", dataIndex: "name", key: "name" },
    { title: "资产地址", dataIndex: "address", key: "address" },
    { title: "探测方法", dataIndex: "method", key: "method" },
    { title: "存活情况", dataIndex: "status", key: "status" },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={handleDetection}
        style={{ marginBottom: "16px" }}
      >
        进行资产探测
      </Button>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default AssetDetection;
