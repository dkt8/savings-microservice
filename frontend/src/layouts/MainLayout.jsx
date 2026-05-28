import React from "react";
import { Layout, Menu } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { BankOutlined, ShoppingOutlined, DashboardOutlined } from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

export default function MainLayout() {
  const location = useLocation();

  const menuItems = [
    { key: "/", icon: <DashboardOutlined />, label: <Link to="/">Dashboard</Link> },
    { key: "/products", icon: <ShoppingOutlined />, label: <Link to="/products">Sản phẩm tiết kiệm</Link> },
    { key: "/accounts", icon: <BankOutlined />, label: <Link to="/accounts">Danh sách tài khoản</Link> },
    { key: "/accounts/open", icon: <BankOutlined />, label: <Link to="/accounts/open">Mở tài khoản</Link> },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible width={260} collapsedWidth={80}>
        <div style={{ height: 32, margin: 16, background: "rgba(255, 255, 255, 0.2)", textAlign: 'center', color: '#fff', lineHeight: '32px', fontWeight: 'bold' }}>
          CORE SAVING
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={menuItems} />
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0, textAlign: "center", fontSize: "18px", fontWeight: "bold" }}>
          Hệ Thống Quản Lý Tiết Kiệm (Core Banking)
        </Header>
        <Content style={{ margin: "24px 16px", padding: 24, background: "#fff", minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
