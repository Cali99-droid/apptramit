import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import { ToastContainer } from "react-toastify"



export default function Layout() {
  return (
    <>
    <Header/>
    <ToastContainer />
    <main>
        <Outlet/> 
    </main>
       
    </>
    
    
  )
}
