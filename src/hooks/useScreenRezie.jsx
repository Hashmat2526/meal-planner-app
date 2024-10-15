"use client"
import { useEffect, useState } from "react"

export const useScreenResizeHandler = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.screen.availWidth
      if (width >= 1024) {
        setIsDesktop(true)
        setIsMobile(false)
        setIsTablet(false)
      } else if (width >= 768) {
        setIsDesktop(false)
        setIsMobile(false)
        setIsTablet(true)
      } else {
        setIsDesktop(false)
        setIsMobile(true)
        setIsTablet(false)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return { isMobile, isTablet, isDesktop }
}
