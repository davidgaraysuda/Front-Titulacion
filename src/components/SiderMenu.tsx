import React, {ReactNode}from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';



interface MenuItem {
  label: string;
  path: string;
  element: React.ReactNode;
}

interface NavigationLayoutProps {
  menuItems: MenuItem[];
}

const SiderMenu: React.FC <NavigationLayoutProps> = ({ menuItems }) => {
  const { pathname } = useLocation();
  const {Content} = Layout;
  const location = useLocation();
  return (
    <Layout.Sider collapsible collapsed={false}>
      <div className="logo" />
      <Menu theme="dark" selectedKeys={[location.pathname]} mode="inline" defaultSelectedKeys={['0']}>
      {menuItems.map((route, index) => (
            <Menu.Item key={index}>
              <Link to={route.path}>{route.label}</Link>
            </Menu.Item>
          ))}
      </Menu>
    </Layout.Sider>
  );
}

export default SiderMenu;
