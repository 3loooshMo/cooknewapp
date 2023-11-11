import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {  Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const UserList = () => {
    const [user, setUsers] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/api/auth/users')
            .then((result) => {
                if (result.data.state) {
                    setUsers(result.data.user);
                } else {
                    toast.error("اسم الستخدم موجود بالفعل")

                }
            })
            .catch(err => console.log(err))
            
   
    }, [])
    const handelDelete = (id) =>{
        axios.delete('http://localhost:8000/api/auth/delete_user/'+id)
            .then((result) => {
                if (result.data.state) {
                    toast.success("تم المسح بنجاح")
                   window.location.reload(true)
                } else {
                    toast.error("اسم الستخدم موجود بالفعل")

                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <div className='order-items'>
                <div className="orders-tabe">
                    <div className="orders-detales">
                        <table>
                            <thead>
                                <tr>
                                    <td>#</td>
                                    <td>الاسم </td>
                                    <td>اسم المستخدم </td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    user.map(item => (
                                        <tr key={item.id}>
                                          <td className='td-id'>{item.id}</td>
                                            <td className='td-item'>{item.name}</td>
                                            <td className='td-item'>{item.user_name}</td>
                                            <td className='order-count'>
                                                <div onClick={()=>handelDelete(item.id)} className="removeItem">
                                                    مسح المستخدم 
                                                </div>
                                                <Link to={'/home-admin/users/edit/'+item.id} className="editItem">
                                                    تعديل
                                                </Link>
                                            </td>
                                        </tr>

                                    )
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default UserList
