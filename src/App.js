import React, { useState, useEffect } from "react";

import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { Layout, Menu, theme, Breadcrumb, Image } from "antd";
import chargerIcon from "./assets/charging-station.png";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";

import { NavLink, Outlet, useLocation } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
const menuItems = [
  {
    label: "home",
    key: "/home",
    icon: <HomeOutlined />,
  },
  {
    label: "userFavouriteCharger",
    key: "/userFavouriteCharger",
    icon: <HomeOutlined />,
  },
  {
    label: "clickChargesTimes",
    key: "/clickChargesTimes",
    icon: <HomeOutlined />,
  },
  {
    label: "searchLocation",
    key: "/searchLocation",
    icon: <HomeOutlined />,
  },
  {
    label: "userCarList",
    key: "/userCarList",
    icon: <HomeOutlined />,
  },
];
const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [currentMenu, setCurrentMenu] = useState({});
  // 定义selectedKeys，来控制菜单选中状态和切换页面
  const [selectedKeys, setSelectedKeys] = useState([]);
  // useLocation react-router自带hook，能获取到当前路由信息
  const location = useLocation();
  // 每次切换路由，获取当前最新的pathname,并赋给menu组件
  useEffect(() => {
    // location.pathname对应路由数据中的path属性
    setSelectedKeys([location.pathname]);
    // store current menu
    setCurrentMenu(menuItems.find((item) => item.key === location.pathname));
  }, [location]);
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div
          className="demo-logo-vertical"
          style={{
            height: 64,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <Image height={30} src={chargerIcon} style={{paddingRight:10}}/> Admin
        </div>
        <Menu
          defaultSelectedKeys={"topNews"}
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          items={menuItems.map((item) => {
            return {
              key: item.key,
              label: <NavLink to={item.key}>{item.label}</NavLink>,
              disabled: item.disabled,
              icon: item.icon,
            };
          })}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "end",
            padding: 0,
            paddingRight: 20,
            background: colorBgContainer,
            position: "relative",
          }}
        >
          {location.pathname != "/" && (
            <Breadcrumb
              items={[
                {
                  href: "/",
                  title: <HomeOutlined />,
                },
                {
                  title: currentMenu?.label,
                },
              ]}
              style={{ position: "absolute", left: 20 }}
            />
          )}
          {/* <div style={{ paddingRight: 10 }}>Hello <span style={{ color: '#1677ff' }}>{user.username}</span></div> */}
          <div
            // onClick={signOut}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              color: "#1677ff",
              cursor: "pointer",
            }}
          >
            <LogoutOutlined style={{ fontSize: 20, color: "#1677ff" }} />
            Sign out
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              height: "100%",
              overflowY: "auto",
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          EV Charger Admin ©{new Date().getFullYear()} Created by Yoobee MSE
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
