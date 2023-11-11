import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const Product = () => {
    const nav = useNavigate();
    return (
        <>
        <div className="continer">
        <p className='text'>قائمة الطبات</p>            
            <button className="btn-add_catogress" onClick={() => nav('/home-admin/product/add')}>
              <p>إضافة منتج</p>
            </button>
            </div>
            <div className="items_admin_list">
                <Outlet />
            </div>

        </>
    )
}

export default Product
