"use client"

import React, { useState } from "react"
import InputField from "./common/InputField"
import { Button, Form, message } from "antd"
import { useFormik } from "formik"
import * as yup from "yup"

import { useRouter } from "next/navigation"
import { BACK_API_URL } from "@/config/backendApi"
import useMeRequest from "@/hooks/useMe"

export const LoginPageFormSection = () => {
  const loginUserSchema = yup.object().shape({
    username: yup.string().trim().required(`Username is required.`),
    password: yup.string().trim().required(`Password is required`),
  })

  const initialValues = {
    username: "",
    password: "",
  }

  const router = useRouter()
  const [messageApi, contextHolder] = message.useMessage()
  const [errorMessage, setErrorMessage] = useState(``)
  const [isLoading, setIsLoading] = useState(false)

  const success = () => {
    messageApi.open({
      type: "loading",
      content: "Action in progress..",
      duration: 1,
    })
  }
  const { meRequest } = useMeRequest()

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginUserSchema,
    validateOnChange: false, // this one
    validateOnBlur: false, // and this one
    onSubmit: async (values) => {
      setIsLoading(true)
      success()
      setErrorMessage(``)
      try {
        const response = await meRequest(`${BACK_API_URL}/login`, {
          username: values.username,
          password: values.password,
        })

        if (response) {
          router.push("/dashboard")
        } else {
          setErrorMessage("Invalid login credentials.")
        }
      } catch (error) {
        setErrorMessage(`Authentication failed`)
      } finally {
        setIsLoading(false)
      }
    },
  })

  const FormItem = Form.Item
  const { errors, touched, values, handleSubmit, handleChange, handleBlur } =
    formik || {}

  return (
    <>
      {contextHolder}
      <div className="w-[50%] flex flex-col justify-center items-center gap-5">
        <div className="mb-16">
          <h1 className="text-center font-bold text-3xl">Meal Planner!</h1>
          <span className="text-secondary text-md pt-6 inline-block">
            Effortlessly craft custom weekly meal plans that cater to your
            family's dietary needs.
          </span>
        </div>
        <Form
          layout="vertical"
          name="login-form"
          className="w-full"
          onFinish={handleSubmit}
        >
          <FormItem
            help={touched.username && errors.username ? errors.username : ""}
            validateStatus={
              touched.username && errors.username ? "error" : undefined
            }
            label="User Name *"
          >
            <InputField
              type="text"
              name="username"
              placeholder={"Username"}
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !errors?.username) {
                  handleSubmit()
                }
              }}
              required
            />
          </FormItem>
          <FormItem
            help={touched.password && errors.password ? errors.password : ""}
            validateStatus={
              touched.password && errors.password ? "error" : undefined
            }
            label="Password *"
          >
            <InputField
              ispassword="true"
              type="password"
              placeholder={"Password"}
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !errors?.password) {
                  handleSubmit()
                }
              }}
              required
            />
          </FormItem>
          {!!errorMessage && <h1 className="text-red-600">{errorMessage}</h1>}
          <Button
            size="large"
            type="primary"
            className="rounded-lg w-full"
            key="submit"
            htmlType="submit"
            disabled={isLoading}
            loading={isLoading}
          >
            Login
          </Button>
        </Form>
      </div>
    </>
  )
}
