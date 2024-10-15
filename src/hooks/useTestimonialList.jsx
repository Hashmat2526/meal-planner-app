import { useEffect, useState } from "react"
import axios from "axios"
import useHandleApiError from "@/app/components/common/commonApiChecker"

export const useTestimonialList = (apiEndpoint) => {
  const handleApiError = useHandleApiError()

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(apiEndpoint)
      setData(response.data)
    } catch (error) {
      await handleApiError(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [apiEndpoint])

  const refetch = () => {
    fetchData()
  }

  return { data, loading, error, refetch }
}
