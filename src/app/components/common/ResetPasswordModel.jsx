import React, { useState } from "react"
import { Modal, Form, Input, Button, message } from "antd"
import { sendPasswordResetEmail } from "firebase/auth" // Assuming Firebase auth import
import { auth } from "@/config/firebase.config" // Adjust the import path as per your configuration

const PasswordResetModal = ({ visible, setVisible }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleOk = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      await sendPasswordResetEmail(auth, values.email)
      message.success("Password reset email sent. Check your inbox.")
      form.resetFields()
      setVisible(false)
    } catch (error) {
      message.error("Failed to send password reset email. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }

  return (
    <Modal
      title="Reset Password"
      open={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleOk}
          loading={loading}
          disabled={loading}
        >
          Send Email
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please enter your email address",
            },
            {
              type: "email",
              message: "Please enter a valid email address",
            },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default PasswordResetModal
