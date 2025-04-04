import React, { forwardRef } from "react";
import { Menu } from "antd";
import { RadarChartOutlined } from "@ant-design/icons";

// 使用 forwardRef 来传递 ref 给 Menu 组件
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
      ref={ref} // 这里传递 ref
      mode="inline"
      defaultSelectedKeys={[defaultSelected]} // 默认选中资产探测
      style={{ height: "100%", borderRight: 0 }}
      items={items} // 使用 items 替代 children
    />
  );
});

export default Sidebar;
