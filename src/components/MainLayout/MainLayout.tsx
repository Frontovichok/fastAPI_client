import React, { useEffect, useState } from "react";
import "../../index.css";
import "./MainLayout.css";
import {
  BellFilled,
  BellOutlined,
  CalendarOutlined,
  DesktopOutlined,
  FileOutlined,
  HomeOutlined,
  LaptopOutlined,
  LogoutOutlined,
  MessageFilled,
  NotificationOutlined,
  PieChartOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Badge, Breadcrumb, Layout, Menu, theme } from "antd";
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Projects from "../Projects/Projects";
import Project from "../Project/Project";
import NewProject from "../Projects/NewProject/NewProject";
import axios from "axios";
const { Header, Content, Sider } = Layout;

// const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));

// const items2: MenuProps["items"] = [
//   UserOutlined,
//   LaptopOutlined,
//   NotificationOutlined,
// ].map((icon, index) => {
//   const key = String(index + 1);

//   return {
//     key: `sub${key}`,
//     icon: React.createElement(icon),
//     label: `subnav ${key}`,

//     children: new Array(4).fill(null).map((_, j) => {
//       const subKey = index * 4 + j + 1;
//       return {
//         key: subKey,
//         label: `option${subKey}`,
//       };
//     }),
//   };
// });

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

  const [collapsed, setCollapsed] = useState(false);
  const [isAuthorized, setAuthorized] = useState(true);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const { headers, data, status } = await axios.post("/auth/jwt/logout");
      checkAuthorized();
    } catch (error) {
      checkAuthorized();
      if (axios.isAxiosError(error)) {
        console.log("error: ", error);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  };

  useEffect(() => {
    //will run at the component loading because array is empty, see second argument of useEffect
    console.log("useEffect isAuthorized:", isAuthorized);

    if (!isAuthorized) {
      navigate("/login");
    }
    checkAuthorized();
  }, [isAuthorized]);

  // useEffect(() => {
  //   console.log("useEffect [] isAuthorized:", isAuthorized);

  //   if (!isAuthorized) {
  //     navigate("/login");
  //   }
  //   checkAuthorized();
  // }, []);

  const checkAuthorized = async () => {
    try {
      const { headers, data } = await axios.get("/current_user");
      console.log("success, user authorized: ", data);
      setAuthorized(true);
      // setAuthUser(data);
    } catch (error) {
      setAuthorized(false);
      // setAuthUser("");
      if (axios.isAxiosError(error)) {
        console.log("error: ", error);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error";
      }
    }
  };

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
              />
            </Link>
          </div>
        </div>
        <div className="headerRightButtons">
          <div>
            <Link to="/login">
              <Badge count={1} size="small">
                <Avatar shape="square" size="default">
                  <UserOutlined style={{ fontSize: "20px", color: "#08c" }} />
                </Avatar>
              </Badge>
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
              onClick={logout}
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
            <Routes>
              <Route path="/" element={<Projects />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/new_project" element={<NewProject />} />
              <Route path="/project/:projectId" element={<Project />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
