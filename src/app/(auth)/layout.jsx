"use client"
import { useScreenResizeHandler } from "@/hooks/useScreenRezie"
import { useEffect, useState } from "react"

export default function DashboardLayout({ children }) {
  const [isMounted, setIsMounted] = useState(false)
  const { isMobile } = useScreenResizeHandler()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <section
      className={`w-full h-screen ${
        !isMobile ? "grid grid-cols-2" : ""
      } relative`}
    >
      {/* Background Image Section */}
      {!isMobile && (
        <section
          className="w-full h-full bg-login-background bg-blue-200 bg-opacity-20 mx-10 bg-contain bg-center bg-no-repeat flex justify-center items-center" // Added padding
          style={{
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        ></section>
      )}

      {/* Main Content Section (Login Form, etc.) */}
      <section className="flex w-full h-full justify-center items-center py-10">
        {children}
      </section>
    </section>
  )
}
