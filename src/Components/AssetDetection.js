import React, { useState } from "react";
import { Table, Button, Modal } from "antd";
import { probeAssets } from "../utils"; // 导入 utils.js 中的 probeAssets 函数

const AssetDetection = ({ isLoggedIn, showModal }) => {
  const [data, setData] = useState([
    {
      key: "1",
      type: "信息系统",
      name: "XXX 信息系统",
      address: "http://www.baidu.com",
      method: "HTTP 探测",
      status: "未知",
      message: "未知",
    },
    {
      key: "2",
      type: "网络设备",
      name: "交换机",
      address: "192.168.1.2",
      method: "PING 探测",
      status: "未知",
      message: "未知",
    },
    {
      key: "3",
      type: "网络设备",
      name: "交换机",
      address: "192.168.1.2:22",
      method: "端口探测",
      status: "未知",
      message: "未知",
    },
    {
      key: "4",
      type: "服务器",
      name: "XXX 系统 web 服务器",
      address: "192.168.1.4",
      method: "PING 探测",
      status: "未知",
      message: "未知",
    },
    {
      key: "5",
      type: "服务器",
      name: "XXX 系统 web 服务器",
      address: "192.168.1.4:22",
      method: "端口探测",
      status: "未知",
      message: "未知",
    },
    {
      key: "6",
      type: "服务器",
      name: "XXX 系统 web 服务器",
      address: "192.168.1.4:3306",
      method: "端口探测",
      status: "未知",
      message: "未知",
    },
    {
      key: "7",
      type: "安全设备",
      name: "防火墙",
      address: "192.168.1.3",
      method: "PING 探测",
      status: "未知",
      message: "未知",
    },
    {
      key: "8",
      type: "安全设备",
      name: "防火墙",
      address: "https://192.168.1.3",
      method: "HTTP 探测",
      status: "未知",
      message: "未知",
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

    const addresses = data.map((item) => item.address); // 提取所有资产地址

    try {
      const token = localStorage.getItem("token");
      console.log("token: " + token);
      const assetResponses = await probeAssets(addresses, token); // 调用 probeAssets 函数进行资产探测

      // 更新表格中的存活情况
      const updatedData = data.map((item) => {
        const response = assetResponses.find(
          (response) => response.asset === item.address
        );
        return {
          ...item,
          status: response ? response.status : "未知", // 更新存活情况
          message: response ? "探测完成" : "未知", // 更新说明
        };
      });

      setData(updatedData); // 更新数据
    } catch (error) {
      Modal.error({
        title: "资产探测失败",
        content: "探测过程发生错误，请重试。",
      });
    }
  };

  const columns = [
    { title: "资产类型", dataIndex: "type", key: "type" },
    { title: "资产名称", dataIndex: "name", key: "name" },
    { title: "资产地址", dataIndex: "address", key: "address" },
    { title: "探测方法", dataIndex: "method", key: "method" },
    { title: "存活情况", dataIndex: "status", key: "status" },
    { title: "说明", dataIndex: "message", key: "message" },
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
