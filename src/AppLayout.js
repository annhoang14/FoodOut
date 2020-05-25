import React from "react";

import "antd/dist/antd.css";
import { Layout } from "antd";

import App from "./App.js"
import "./temp.css";

const { Header, Content, Footer } = Layout;

function AppLayout() {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
      </Header>
      <Content style={{ padding: '20px 50px 0 50px' }}>
        <div className="site-layout-content">
          <App />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  )
}

export default AppLayout;