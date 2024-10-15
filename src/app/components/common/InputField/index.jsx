import { Input } from "antd"
import React from "react"

const InputField = (props) => {
  return props.ispassword === "true" ? (
    <Input.Password
      size="large"
      className="text-gray-800 bg-white rounded-md"
      {...props}
    />
  ) : (
    <Input
      size="large"
      className="text-gray-800 bg-white rounded-md"
      {...props}
    />
  )
}

export default InputField
