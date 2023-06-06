import { Outlet } from "react-router-dom"
import { Navigation } from "../navbar/Navigation"

export const Layout = () => {
  return (
    <>
      <Navigation/>
      <Outlet />
    </>
  )
}