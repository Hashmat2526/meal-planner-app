"use client"

import React, { useEffect, useState } from "react"
import { Card, Modal, Tooltip, message } from "antd"
import {
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  LoadingOutlined,
} from "@ant-design/icons"
import useSubmitForm from "@/hooks/useSubmitForm"
import { BACK_API_URL } from "@/config/backendApi"
import { useReadLocalStorage } from "usehooks-ts"

const ProfileCard = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const fullName = `${data?.user?.first_name} ${data?.user?.last_name}`

  return (
    <div className="flex flex-col gap-4">
      <Card className={`rounded-lg shadow-md ${data?.user?.bg} relative`}>
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="text-lg font-semibold capitalize">{fullName}</div>
            <div className="text-gray-400 text-sm capitalize">
              {data?.user?.email}
            </div>
          </div>
        </div>
      </Card>
      {data?.meals?.map((meal, index) => (
        <Card
          key={index}
          className={`flex flex-col rounded-lg shadow-md ${data?.user?.bg} bg-opacity-50 max-h-40 overflow-hidden`}
        >
          <h1 className="text-lg font-bold">Meal Day {index + 1}</h1>
          <div>
            <span className="font-semibold">Breakfast:</span> {meal.breakfast}
          </div>
          <div>
            <span className="font-semibold">lunch:</span> {meal.lunch}
          </div>
          <div>
            <span className="font-semibold">Dinner:</span> {meal.dinner}
          </div>
        </Card>
      ))}
    </div>
  )
}

export default ProfileCard
