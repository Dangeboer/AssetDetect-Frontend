import React from "react";
import { Menu } from "antd";
import { RadarChartOutlined } from "@ant-design/icons";

const Sidebar = ({ defaultSelected }) => {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={[defaultSelected]} // 默认选中资产探测
      style={{ height: "100%", borderRight: 0 }}
    >
      <Menu.Item key="asset-detection" icon={<RadarChartOutlined />}>
        资产探测
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
