import React from 'react'
import '../css/items.css'
import OrderItems from '../components/OrderItems'
import MenuItems from '../components/MenuItems'
const Items = () => {
  return (
    <div className='items'>
      <MenuItems />
      <div className='divider-container'></div>
      <OrderItems />
    </div>
  )
}

export default Items
