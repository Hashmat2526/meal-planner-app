import { useState, useEffect } from "react"
import axios from "axios"
import { useLocalStorage } from "usehooks-ts"
import useHandleApiError from "@/app/components/common/commonApiChecker"
import { setCookie } from "cookies-next"

const useMeRequest = () => {
  const handleApiError = useHandleApiError()

  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const localStorage = useLocalStorage("user", null)

  const login = async (url, { username, password }) => {
    try {
      const response = await axios.post(url, {
        email: username,
        password,
      })

      const user = response.data
      console.log(user)
      setData(user)
      setCookie("user", user)
      localStorage[1](user)
      return true
    } catch (err) {
      await handleApiError(err)
      setError(err)
      throw err
    }
  }

  return { data, error, meRequest: login }
}

export default useMeRequest
