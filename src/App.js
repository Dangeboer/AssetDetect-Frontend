import "antd/dist/antd.min.css";
import React, { useState, useEffect, useRef } from "react";
import { Layout, Button, Typography, message } from "antd";
import Sidebar from "./Components/Sidebar";
import AssetDetection from "./Components/AssetDetection";
import LoginRegisterModal from "./Components/LoginRegister";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") !== null
  );
  const [assetDetectionKey, setAssetDetectionKey] = useState(Date.now()); // 设置 key 用于刷新 AssetDetection

  const hasShownMessage = useRef(false);

  useEffect(() => {
    if (!hasShownMessage.current) {
      message.success("组件加载完成！");
      hasShownMessage.current = true;
    }
  }, []);

  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    setAssetDetectionKey(Date.now());
    setIsModalVisible(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    message.success("已退出登录");
  };

  const showModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#001529",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title level={3} style={{ color: "#fff", margin: 0 }}>
          资产管理系统
        </Title>
        <div>
          {isLoggedIn ? (
            <Button type="primary" onClick={handleLogout}>
              退出登录
            </Button>
          ) : (
            <Button type="primary" onClick={showModal}>
              登录 / 注册
            </Button>
          )}
        </div>
      </Header>

      <Layout>
        <Sider width={150} collapsedWidth={80} breakpoint="lg">
          <Sidebar defaultSelected="asset-detection" />
        </Sider>

        <Content style={{ padding: "20px" }}>
          <AssetDetection
            key={assetDetectionKey} // 强制刷新
            isLoggedIn={isLoggedIn}
            showModal={showModal}
          />
        </Content>
      </Layout>

      <LoginRegisterModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onLoginSuccess={handleLoginSuccess}
      />
    </Layout>
  );
};

export default App;
