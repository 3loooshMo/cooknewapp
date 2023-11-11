import React from 'react'
import SidebarLeft from '../../components/SaidbarLeft'
import { Outlet } from 'react-router-dom'
const Home = () => {
  return (
    <div className="container">
      <div className="sidebarLeft">
        <SidebarLeft />
      </div>
      <div className="divider-container">
        
      </div>

      <div className="main-content">
        <Outlet />
      </div>
    </div>
  )
}

export default Home
