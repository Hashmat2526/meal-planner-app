import { Inter } from "next/font/google"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import { ConfigProvider } from "antd"
import "./globals.css"
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Meal Planner",
  description: "AI Meal Planner",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden`}>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                // Seed Token
                colorPrimary: "#0866FF",
                borderRadius: 2,

                // Alias Token
                colorBgContainer: "#F0F5FC",
                colorText: "#2B3038",
              },
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
