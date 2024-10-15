"use client"

import React from "react"

import { Layout, theme } from "antd"
import AppHeader from "../Header"

const { Content } = Layout
const LayoutC = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout>
      <Layout
        style={{
          background: colorBgContainer,
        }}
      >
        <Content
          style={{
            display: "flex",
            flexDirection: "column",
            maxHeight: `calc(100vh - 0rem)`,
            overflowY: "auto",
            background: colorBgContainer,
            marginBottom: "4rem",
          }}
        >
          <AppHeader></AppHeader>
          <div style={{ flex: "1 1 auto", overflowY: "auto" }}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  )
}
export default LayoutC
