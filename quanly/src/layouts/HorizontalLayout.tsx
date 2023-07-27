import React from "react";
import {
  ProfileOutlined,
  PieChartOutlined,
  PlusCircleOutlined,
  ExportOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { NavLink } from "react-router-dom";

export interface ILayoutProp {
  children?: React.ReactNode;
}

const { Header, Content, Sider } = Layout;

const HorizontalLayout = ({ children }: ILayoutProp) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <NavLink to="/" className="demo-logo">
          IZ'S CLOSET
        </NavLink>
      </Header>
      <Layout>
        <Sider
          width={250}
          style={{ background: colorBgContainer, paddingTop: "20px" }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item icon={<ProfileOutlined className="menu-item" />}>
              <NavLink
                className="nav-link menu-item-link"
                to="/manager-product"
              >
                Quản lý sản phẩm
              </NavLink>
            </Menu.Item>
            <Menu.Item icon={<PieChartOutlined className="menu-item" />}>
              <NavLink className="nav-link menu-item-link" to="/manager-order">
                Quản lý đơn hàng
              </NavLink>
            </Menu.Item>
            <Menu.Item icon={<BarChartOutlined className="menu-item" />}>
              <NavLink
                className="nav-link menu-item-link"
                to="/manager-business"
              >
                Thống kê
              </NavLink>
            </Menu.Item>
            <Menu.Item icon={<PlusCircleOutlined className="menu-item" />}>
              <NavLink className="nav-link menu-item-link" to="/signin">
                Thêm tài khoản quản lý
              </NavLink>
            </Menu.Item>
            <Menu.Item
              icon={<ExportOutlined className="menu-item" />}
              onClick={() => {
                localStorage.clear();
              }}
            >
              <NavLink className="nav-link menu-item-link" to="/login">
                Đăng xuất
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 680,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default HorizontalLayout;
