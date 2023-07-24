import React from "react";
import {
  ProfileOutlined,
  PieChartOutlined,
  DollarOutlined,
  DatabaseOutlined,
  ExportOutlined,
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
            <Menu.Item icon={<DatabaseOutlined className="menu-item" />}>
              <NavLink className="nav-link menu-item-link" to="#">
                Quản lý danh mục
              </NavLink>
            </Menu.Item>
            <Menu.Item icon={<DollarOutlined className="menu-item" />}>
              <NavLink className="nav-link menu-item-link" to="#">
                Doanh thu
              </NavLink>
            </Menu.Item>
            <Menu.Item
              style={{ position: "absolute", bottom: "1rem" }}
              onClick={() => {
                localStorage.clear();
              }}
              icon={<ExportOutlined className="menu-item" />}
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
