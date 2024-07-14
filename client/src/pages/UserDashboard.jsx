import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/userDahboard/Sidebar'
import Background from '../components/Background'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const UserDashboard = () => {
  return (
    <div>
        
        <div>
        <Background>
            <Navbar/>
            <div className="flex min-h-[100vh] mt-3">
            <Sidebar/>

            
            <Outlet/>
            
            </div>
        </Background>
        <Footer/>
        </div>
    </div>
  )
}

export default UserDashboard