import { useState, useCallback, useEffect, lazy } from "react"
import axios from "axios"
import { getCookie } from "cookies-next"
import { message } from "antd"
import useHandleApiError from "@/app/components/common/commonApiChecker"

const useFetch = (url) => {
  const handleApiError = useHandleApiError()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const user = getCookie("user")
  const decodedValue = decodeURIComponent(user)

  const parsedUser = JSON.parse(decodedValue)
  // Function to fetch data
  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios(url, {
        params: { username: JSON.parse(parsedUser.email) },
      })

      const list = response.data
      setData(list?.map((data) => ({ value: data?._id, label: data?.name })))
    } catch (err) {
      setError(err)
      await handleApiError(err)
      err.response.status !== 403 &&
        message.error(`Something went wrong! Refresh page`)
    } finally {
      setLoading(false)
    }
  }, [url])

  // Fetch data on mount
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Return data, loading, error, and refetch function
  return { data, loading, error, refetch: fetchData }
}

export default useFetch
