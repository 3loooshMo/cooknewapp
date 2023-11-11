import React from 'react'
import { Outlet } from 'react-router-dom'
import SaidBarCacher from '../components/SaidBarCacher'
import '../css/items.css'

const HomeCacher = () => {
  return (
   <>
    <div className="container">
      <div className="sidebarLeft">
        <SaidBarCacher />
      </div>
      <div className="divider-container"></div>
      <div className="main-content">
        <Outlet />
      </div>
  
    </div>
   </>
  )
}

export default HomeCacher
