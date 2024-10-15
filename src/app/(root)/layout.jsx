"use client"
import { useEffect, useState } from "react"
import LayoutC from "../components/Layout"

export default function RootLayout({ children }) {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) {
    return null
  }

  return (
    <main lang="en">
      <LayoutC>{children}</LayoutC>
    </main>
  )
}
