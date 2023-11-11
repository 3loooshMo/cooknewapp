import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const Users = () => {
  const nav = useNavigate();
    return (
        <>
        <div className="continer">
        <p className='text'>قائمة المستخدمين</p>
            
            <button className="btn-add_catogress" onClick={() => nav('/home-admin/users/add')}>
              <p>إضافة مستخدم</p>
            </button>
            </div>
            <div className="items_admin_list">
                <Outlet/>
            </div>
        </>
    )
}

export default  Users
