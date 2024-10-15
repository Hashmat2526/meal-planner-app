// errorHandler.js
import { message } from "antd"
import { signOut } from "firebase/auth"
import { deleteCookie } from "cookies-next"
import { useRouter } from "next/navigation"

const useHandleApiError = () => {
  const router = useRouter()
  const handleApiError = async (error) => {
    const { response } = error

    if (response && response.status === 401) {
      message.error("Session expired. You will be logged out.")

      setTimeout(async () => {
        localStorage.clear()
        deleteCookie("user", "")

        router.push("/login")
      }, 1000)
    }
  }
  return handleApiError
}

export default useHandleApiError
