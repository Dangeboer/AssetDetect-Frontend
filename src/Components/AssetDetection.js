import React, { useState, useEffect } from "react";
import { Table, Button, Modal, message } from "antd";
import { probeAssets } from "../utils";

const AssetDetection = ({ isLoggedIn, showModal }) => {
  const initialData = [
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
  ];

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [abortController, setAbortController] = useState(null);

  // 监听 isLoggedIn 状态变化，退出登录时清除数据
  useEffect(() => {
    if (!isLoggedIn) {
      setData(initialData); // 重置为初始数据
    }
  }, [isLoggedIn, initialData]);

  // 探测函数
  const handleDetection = async () => {
    if (!isLoggedIn) {
      Modal.warning({
        title: "需要登录",
        content: "请先登录再进行资产探测",
        okText: "去登录",
        onOk: () => showModal(),
      });
      return;
    }

    const addresses = data.map((item) => item.address);
    const controller = new AbortController();
    setAbortController(controller); // 保存控制器

    setLoading(true); // 开始加载
    try {
      const token = localStorage.getItem("token");
      const assetResponses = await probeAssets(
        addresses,
        token,
        controller.signal
      );

      // 更新数据
      const updatedData = data.map((item) => {
        const response = assetResponses.find(
          (response) => response.asset === item.address
        );
        return {
          ...item,
          status: response ? response.status : "未知",
          message: response ? response.message : "未知",
        };
      });

      setData(updatedData); // 更新表格
      message.success("探测完成");
    } catch (error) {
      if (error.name === "AbortError") {
        message.warning("探测已中止");
      }
    } finally {
      setLoading(false);
    }
  };

  // 中止探测
  const handleAbort = () => {
    if (abortController) {
      abortController.abort();
      setData(initialData); // 恢复初始数据
      message.warning("探测已中止");
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
        disabled={loading}
      >
        进行资产探测
      </Button>

      <Table columns={columns} dataSource={data} />

      {loading && (
        <Modal
          open={true}
          title="正在探测中，请稍后..."
          footer={null}
          closable={false}
          maskClosable={false}
          centered
        >
          <Button
            type="danger"
            onClick={handleAbort}
            style={{ width: "100%" }}
            disabled={!loading}
          >
            中止探测
          </Button>
        </Modal>
      )}
    </div>
  );
};

export default AssetDetection;
