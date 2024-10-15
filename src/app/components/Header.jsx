import { Avatar, Dropdown } from "antd"
import { usePathname, useRouter } from "next/navigation"
import React from "react"
import { deleteCookie } from "cookies-next"
import { useReadLocalStorage } from "usehooks-ts"

const AppHeader = ({ children }) => {
  const pathName = usePathname()
  const router = useRouter()
  const handleLogout = () => {
    localStorage.clear()
    deleteCookie("user", "")
    router.push("/")
  }
  const items = [
    {
      key: "1",
      label: (
        <p onClick={handleLogout} className="px-2 font-bold">
          Logout
        </p>
      ),
    },
  ]
  const { first_name, last_name } = useReadLocalStorage("user") || {}

  const fullName = `${first_name} ${last_name}`

  return (
    <div className="my-2 sm:my-3">
      <div className="flex items-center justify-between mx-2 md:mx-6">
        <h1 className="text-2xl font-semibold capitalize">
          {children}
          {pathName.replace(`/`, ``)}
        </h1>
        <div className="flex items-center space-x-4">
          <div className="">
            <h3 className="text-[1.12rem] font-semibold capitalize">
              {fullName}
            </h3>
          </div>
          <div className="cursor-pointer">
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              placement="bottomLeft"
              className="rounded-lg"
            >
              <div onClick={(e) => e.preventDefault()}>
                <Avatar src="/next.svg" />
              </div>
            </Dropdown>
            {/* <Avatar size={36}  */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppHeader
