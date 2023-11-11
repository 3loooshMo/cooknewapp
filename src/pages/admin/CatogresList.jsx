import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {Link} from 'react-router-dom'
const CatogresList = () => {
    const [catogres, setCatogres] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/get-categories')
            .then((result) => {
                if (result.data.state) {
                    setCatogres(result.data.categories);
                    
                } else {
                    // toast.error("اسم الستخدم موجود بالفعل")
                }
            })
            .catch(err => console.log(err))
    }, [])
    const handelDelete = (id) =>{
        axios.delete('http://localhost:8000/delete-categories/'+id)
            .then((result) => {
                console.log(result.data.state)
                if (result.data.state) {
                    toast.success("تم المسح بنجاح")
                    window.location.reload(false)
                } else {
                    // toast.error("اسم الستخدم موجود بالفعل")
                    console.log("no ")
                }
            })
            .catch(err => console.log(err))
        }
    return (
        <div>
            <div className='order-items'>
                <div className="orders-tabe">
                    
                    {
                    catogres.length > 0 ?
                   <div className="orders-detales">
                    <table>
                            <thead>
                                <tr>
                                    <td className='id'>#</td>
                                    <td >الاسم </td>
                                    <td >الاسم </td>
                                    <td>/</td>
                                </tr>
                            </thead>
                            <tbody className='tbody'>
                                {
                                    catogres.map(item => (
                                        
                                        <tr key={item.id}>
                                            <td className='td-id'>{item.id}</td>
                                            <td className='td-item'>{item.category}</td>
                                            <td><img style={{width:"80px",height:"30px",borderRadius:"5%"}} src={'http://localhost:8000/'+item.file_name} alt="catogres" /></td>
                                            <td className='order-count'>
                                                <div onClick={()=>handelDelete(item.id)} className="removeItem">
                                                    مسح الصنف
                                                </div>
                                                <Link to={"/home-admin/catogres/edit/"+item.id}className="editItem">
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
                         : <h1>لا توجد تصنيفات لعرضها</h1> }

                </div>

            </div>
        </div>
    )
}
export default CatogresList
