import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import '../../css/catogres.css'
const Catogres = () => {
    const nav = useNavigate();
    return (
        <>
            <div className="continer">
                <p className='text'>قائمة الاصناف</p>
                <button className="btn-add_catogress" onClick={() => nav('/home-admin/catogres/add')}>
                    <p>إضافة صنف</p>
                </button>
            </div>
            <div className="items_admin_list">
                <Outlet />
            </div>
        </>
    )
}

export default Catogres
