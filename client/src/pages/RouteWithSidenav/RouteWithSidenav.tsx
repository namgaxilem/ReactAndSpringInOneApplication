import {
  DesktopOutlined,
  DoubleLeftOutlined,
  PieChartOutlined,
  QuestionCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Breadcrumb,
  Dropdown,
  Layout,
  Menu,
  Space,
  Typography,
} from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import { LOGOUT_ENDPOINT } from "config/constants";
import { useAuth } from "context/auth";
import Deployment from "pages/Deployment/Deployment";
import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { getUserFirstAndLastNameCharacter } from "utils/common";
import Catalog from "../Catalog/Catalog";
import Dashboard from "../Dashboard/Dashboard";
import Environments from "../Environments/Environments";
import styles from "./RouteWithSidenav.module.less";

const { Header, Content, Footer, Sider } = Layout;

const RouteWithSidenav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const handleMenuClick = (e) => {
    if (e.key === "1") {
      window.location.href = LOGOUT_ENDPOINT;
    }
  };

  useEffect(() => {
    if (location.pathname === "/login") {
      navigate("/dashboard");
    }
  }, [location]);

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        <Typography.Text>Logout</Typography.Text>
      </Menu.Item>
      <Menu.Item key="2">
        <Typography.Text>User Info</Typography.Text>
      </Menu.Item>
    </Menu>
  );

  const breadcrumbNameMap: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/catalog": "Catalog",
    "/environments": "Environments",
    "/deployments": "Deployments",
  };

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return (
    <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
      <Sider
        theme={"dark"}
        // collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <div className={styles.logo} />

        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <NavLink to="/dashboard">
              <div>Dashboard</div>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <NavLink to="/catalog">
              <div>Catalog</div>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={<TeamOutlined />}>
            <NavLink to="/environments">
              <div>Environments</div>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="4" icon={<TeamOutlined />}>
            <NavLink to="/deployments">
              <div>Deployments</div>
            </NavLink>
          </Menu.Item>
        </Menu>

        <Menu
          theme="dark"
          mode="inline"
          style={{ position: "absolute", bottom: 48, width: "100%" }}
        >
          <Menu.Item key="5" icon={<QuestionCircleOutlined />} onClick={() => console.log("testtest")}>
            <NavLink to="/help">
              <div>Help</div>
            </NavLink>
          </Menu.Item>
          <Menu.SubMenu
            icon={
              <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
                {getUserFirstAndLastNameCharacter(user?.name || "")}
              </Avatar>
            }
            title="User"
          >
            <Menu.Item onClick={() => setCollapsed(!collapsed)}>
              Logout
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>

        <div className={styles.collapseButton}>
          <span>Build number asd</span>
          <DoubleLeftOutlined />
        </div>
        
      </Sider>

      <Layout className="site-layout">
        <Header className={styles.siteLayoutBackground} style={{ padding: 0 }}>
          <Breadcrumb className={styles.breadcumb}>
            {breadcrumbItems}
          </Breadcrumb>

          <Dropdown overlay={menu} placement="bottom" trigger={["click"]}>
            <div className={styles.avatar}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  padding: "1em",
                }}
              >
                <Space
                  className="mock-block"
                  style={{
                    height: "50%",
                    lineHeight: "100%",
                    justifyContent: "end",
                  }}
                >
                  <Typography.Text strong>{user && user.name}</Typography.Text>
                </Space>
                <Space
                  className="mock-block"
                  style={{
                    height: "50%",
                    lineHeight: "100%",
                    justifyContent: "end",
                  }}
                >
                  <Typography.Text type="secondary"> Admin</Typography.Text>
                </Space>
              </div>
              <Avatar
                size={"large"}
                style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
              >
                {getUserFirstAndLastNameCharacter(user?.name || "")}
              </Avatar>
            </div>
          </Dropdown>
        </Header>
        <Content className={styles.siteLayoutContent}>
          <div
            className={styles.siteLayoutBackground}
            style={{ padding: 24, minHeight: 360 }}
          >
            <Routes>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/catalog" element={<Catalog />}></Route>
              <Route path="/environments" element={<Environments />}></Route>
              <Route path="/deployments" element={<Deployment />}></Route>
              <Route path="/*" element={<Dashboard />}></Route>
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default RouteWithSidenav;
