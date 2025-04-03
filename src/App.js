import React, { useState, useEffect } from "react";
import { Layout, Button, Typography } from "antd";
import Sidebar from "./Components/Sidebar";
import AssetDetection from "./Components/AssetDetection";
import LoginRegisterModal from "./Components/LoginRegister";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 添加 useEffect，在页面加载时检查 localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("useEffect token: " + token);
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const showModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token);
    console.log("handleLoginSuccess tokne: " + localStorage.getItem("token"));
    setIsLoggedIn(true);
    setIsModalVisible(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

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
        <Sider>
          <Sidebar defaultSelected="asset-detection" />
        </Sider>

        <Content style={{ padding: "20px" }}>
          <AssetDetection isLoggedIn={isLoggedIn} showModal={showModal} />
        </Content>
      </Layout>

      <LoginRegisterModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onLoginSuccess={handleLoginSuccess} // 将 handleLoginSuccess 作为回调传递
      />
    </Layout>
  );
};

export default App;
