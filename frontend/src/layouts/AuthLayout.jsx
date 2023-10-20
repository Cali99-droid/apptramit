import { Outlet } from "react-router-dom"
// import Header from "../components/Header"
import { Container } from "@mui/material"
import Footer from "../components/Footer"
import { ToastContainer } from "react-toastify"


export default function AuthLayout() {
  return (
    <>
    {/* <Header /> */}
    <Container maxWidth="sm">
    <ToastContainer />
        <Outlet/>
    </Container>
    <Footer />
        
    </>
  )
}
