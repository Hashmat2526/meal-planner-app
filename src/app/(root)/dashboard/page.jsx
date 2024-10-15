"use client"

import { Button, Skeleton } from "antd"
import Card from "antd/es/card/Card"
import { ImportOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import ProfileCard from "@/app/components/common/MealPlanCard"
import Spinner from "@/app/components/common/Spinner"
import { BACK_API_URL } from "@/config/backendApi"
import axios from "axios"
import { useReadLocalStorage } from "usehooks-ts"

export default function Home() {
  const containerStyles = {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    width: "100%",
    boxSizing: "border-box",
    gap: "10px", // Ensure padding doesn't affect the width
  }

  const { family_id, family_members } = useReadLocalStorage("user")

  const [isLoading, setIsLoading] = useState(true)
  const [testimonialsData, setTestimonialsData] = useState([])

  const fetchData = async (url) => {
    try {
      const response = await fetch(url)
      const res = await response.json()
      const data = res.split(`json`)[1].split("```")[0]
      return JSON.parse(data) // Return the response data
    } catch (error) {
      console.error("Error fetching data:", error.message)
      // throw error; // Optionally, rethrow the error for further handling
    }
  }

  const backgroundColor = {
    0: "bg-red-100",
    1: "bg-blue-100",
    2: "bg-yellow-100",
    3: "bg-orange-100",
  }

  useEffect(() => {
    // Simulate loading time
    const timeout = setTimeout(async () => {
      const data = await fetchData(
        `${BACK_API_URL}/get-meal-plan?family_id=${family_id}`,
      )

      const mealsData = Object.entries(data).map(([email, meals], index) => {
        const user = family_members.find((it) => it.email === email)
        user.bg = backgroundColor[index]
        return {
          user,
          meals,
        }
      })
      setTestimonialsData(mealsData)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [])

  if (isLoading) {
    return <Spinner position="absolute" />
  }

  console.log(`testimonialsData---`, testimonialsData)

  return (
    <div className="ml-6 mr-4">
      <h1 className="text-lg font-bold">Meals Plan</h1>
      <div className="my-4 grid grid-cols-4 w-full gap-4 overflow-auto h-full">
        {testimonialsData.length > 0 ? (
          testimonialsData.map((item, index) => (
            <ProfileCard key={index} data={item} />
          ))
        ) : (
          <Card className="flex-1 rounded-lg shadow-md p-4 bg-white">
            <Skeleton />
          </Card>
        )}
      </div>
    </div>
  )
}
