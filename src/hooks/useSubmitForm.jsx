import { useState } from "react"
import axios from "axios"
import { message } from "antd"
import useHandleApiError from "@/app/components/common/commonApiChecker"

const useSubmitForm = (initialUrl, method = "POST") => {
  const handleApiError = useHandleApiError()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const submit = async (payload) => {
    setLoading(true)
    setError(null)
    try {
      if (method === "DELETE") {
        const response = await axios.delete(initialUrl)
        setData(response.data)
      }

      if (method === "POST") {
        const response = await axios.post(initialUrl, payload)
        setData(response.data)
      }
      if (method === "PATCH") {
        const response = await axios.patch(initialUrl, payload)
        setData(response.data)
      }
      message.success(`Operation successful`)
    } catch (err) {
      message.error(err?.response?.data?.error ?? `Unknown error`)
      await handleApiError(err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, submit }
}

export default useSubmitForm
