import React, { useState } from "react";
import "../../index.css";
import "./MainLayout.css";
import {
  BellFilled,
  CalendarOutlined,
  DesktopOutlined,
  FileOutlined,
  HomeOutlined,
  LogoutOutlined,
  PieChartOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Badge, Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { selectCurrentUser } from "../../features/auth/AuthSlice";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../../store/services/auth";

const { Header, Content, Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Активные проекты", "1", <PieChartOutlined />),
  getItem("Архив", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Планировщик", "9", <CalendarOutlined />),
  getItem("Документы", "10", <FileOutlined />),
];

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  let [user] = useSelector(selectCurrentUser);

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    logout()
      .then(() => {
        console.log("logout function finished");
      })
      .finally(() => {
        console.log("logout function finally");
        navigate("/login");
      });
  };
  console.log("MainLayout.tsx");

  return (
    <Layout>
      <Header className="mainLayoutHeader">
        {/* <div className="demo-logo" /> */}
        {/* <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        /> */}
        <div className="headerLeftButtons">
          <div className="headerLogoContainer">
            <Link to="/">
              <img
                className="headerLogo"
                src="https://play-lh.googleusercontent.com/ahJtMe0vfOlAu1XJVQ6rcaGrQBgtrEZQefHy7SXB7jpijKhu1Kkox90XDuH8RmcBOXNn"
                alt="header logo"
              />
            </Link>
          </div>
        </div>
        <div className="headerRightButtons">
          <div>
            <Link to="/profile">
              <Badge count={1} size="small">
                <Avatar shape="square" size="default">
                  <UserOutlined style={{ fontSize: "20px", color: "#08c" }} />
                </Avatar>
              </Badge>
              <span>
                <span style={{ color: "#08c" }}>{user.username}</span>
              </span>
            </Link>
          </div>
          <div>
            <Badge count={3} size="small">
              <Avatar shape="square" size="default">
                <BellFilled style={{ fontSize: "20px", color: "#08c" }} />
              </Avatar>
            </Badge>
          </div>
          <div>
            <LogoutOutlined
              style={{ fontSize: "20px", color: "#08c" }}
              onClick={handleLogout}
            />
          </div>
          <div>
            <SettingOutlined style={{ fontSize: "20px", color: "#08c" }} />
          </div>
        </div>
      </Header>
      <Layout>
        {/* <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
          />
        </Sider> */}
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width="230"
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <NavLink to="/">
                <HomeOutlined />
              </NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <NavLink to="/">Проекты</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Проект 1</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
