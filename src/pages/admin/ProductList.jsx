import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const ProductList = () => {
    const [product, setProduct] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/get-product')
            .then((result) => {
                if (result.data.state) {
                    setProduct(result.data.products);
                } else {
                    // toast.error("اسم الستخدم موجود بالفعل")
                }
            })
            .catch(err => console.log(err))
    }, [])
    const handelDelete = (id) => {
        axios.delete('http://localhost:8000/delete-product/'+id)
            .then((result) => {
                if (result.data.state) {
                    toast.success("تم المسح بنجاح")
                    window.location.reload()
                } else {
                    // toast.error("اسم الستخدم موجود بالفعل")

                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <div className='order-items'>
                <div className="orders-tabe">

                    {
                        product.length > 0 ?
                         <div className="orders-detales">
                            <table>
                                <thead>
                                    <tr>
                                        <td>#</td>
                                        <td>الاسم </td>
                                        <td>السعر </td>
                                        <td>التصنيف </td>
                                        <td>المستخدم </td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        product.map(item => (
                                            <tr key={item.id}>
                                                <td className='td-id'>{item.id}</td>
                                                <td className='td-item'>{item.name}</td>
                                                <td className='td-item'>{item.price}</td>
                                                <td className='td-item'>{item.category}</td>
                                                <td className='td-item'>{item.user}</td>
                                                <td className='order-count'>
                                                    <div onClick={() => handelDelete(item.id)} className="removeItem">
                                                        مسح الطلب
                                                    </div>
                                                    <Link to={'/home-admin/product/edit/' + item.id} className="editItem">
                                                        تعديل
                                                    </Link>
                                                </td>
                                            </tr>

                                        )
                                        )
                                    }
                                </tbody>
                            </table>
                        </div> : <h1>لا توجد منتجات لعرضها</h1>
                    }



                </div>

            </div>
        </div>
    )
}

export default ProductList
