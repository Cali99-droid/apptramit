import { Outlet } from "react-router-dom"
// import Header from "../components/Header"
import { Container } from "@mui/material"
import Footer from "../components/Footer"


export default function AuthLayout() {
  return (
    <>
    {/* <Header /> */}
    <Container maxWidth="sm">
        <Outlet/>
    </Container>
    <Footer />
        
    </>
  )
}
