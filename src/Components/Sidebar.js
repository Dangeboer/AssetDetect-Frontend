import React, { forwardRef } from "react";
import { Menu } from "antd";
import { RadarChartOutlined } from "@ant-design/icons";

const Sidebar = forwardRef(({ defaultSelected }, ref) => {
  const items = [
    {
      key: "asset-detection",
      icon: <RadarChartOutlined />,
      label: "资产探测",
    },
  ];

  return (
    <Menu
      ref={ref}
      mode="inline"
      defaultSelectedKeys={[defaultSelected]} // 默认选中资产探测
      style={{ height: "100%", borderRight: 0 }}
      items={items}
    />
  );
});

export default Sidebar;
