
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactContext } from '../app/store';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../index.css'
import {
    FaReadme,
    FaPlus,
    FaMinus,
    FaPrint,


} from "react-icons/fa";
const OrderItems = () => {
    const navigate = useNavigate();
    let [count, setCount] = useState(1)
    const [wite, setWite] = useState([])
    const { setCart, cart, setOrder } = useContext(ReactContext);
    const [payment, setPayment] = useState("كاش")
    const [type, setType] = useState("سفري")
    const user = localStorage.getItem("user")
    const waite = localStorage.getItem('wite');
    useEffect(() => {

    }, [waite, cart])
    const onChange = (e) => {
        setPayment(e.target.value)
    }
    const onTypeChange = (e) => {

        setType(e.target.value);
    }
    const witeItems = () => {

        localStorage.setItem('wite', JSON.stringify(cart))
        setCart(null)
        setCount(1)
    }
    const returnWiteItem = () => {
        const waite = localStorage.getItem('wite');
        setCart(JSON.parse(waite))
        localStorage.setItem('wite', null)
        setWite(null)
    }
    let date = new Date()
    const orderId = Math.floor(Math.random() * 9999999)
    const addOrderDe = () => {
        cart.products.map(i => {
            const data = {
                "name": i.name,
                "price": i.price,
                "count": i.count,
                "category": i.category,
                "order_id": orderId,
                "user": JSON.parse(user).user_name,
                "date": date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
            }
            if(i.count != 0){
            axios.post('/add-order', data)
                .then((result) => {
                    if (result.data.state) {
                        setCart({ products: [], totalPrice: 0 })
                        setCount(1)
                        navigate('/print')

                    } else {
                        console.log(result)
                        toast.error("اسم الستخدم موجود بالفعل")
                    }
                })
                .catch(err => console.log(err))
            }
        })
    }
    const addOrder = () => {
        const data = {
            "total_amount": cart.totalPrice,
            "payment_method": payment,
            "date": date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
            "user": JSON.parse(user).user_name,
            "type": type,
            "order_id": orderId,
        }
        axios.post('/add-report', data)
            .then((result) => {
                if (result.data.state) {
                    toast.success('تم بنجاح')
                    setOrder({ data, cart });
                    addOrderDe()
                } else {
                    setOrder({ data, cart });
                    console.log(result)
                    toast.error('خطأ', result)
                }
            })
            .catch(err => console.log(err))

    }
    const removeItem = () => {
        setCart(null)
        setCount(1)
        window.location.reload()
    }
    return (
        <>
            <div className='order-itemss'>
                <div className="witelist">
                    {
                        cart != null ? <div></div> :
                            <div className='wite-items'>
                                <button onClick={() => returnWiteItem()}>ارجاع الطلب</button>
                            </div>
                    }
                </div>
                <div className="orders-tabes">
                    <div className="orders-detales">
                        <table>
                            <thead>
                                <tr>
                                    <td>#</td>
                                    <td>الاسم </td>
                                    <td>السعر</td>
                                    <td className='table-count'>العدد</td>
                                </tr>
                            </thead>
                            {
                                cart != null && !!cart.products > 0 ?
                                    <tbody>
                                        {
                                            cart.products.map((item) =>
                                            (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.price * item.count}</td>
                                                    <td className='order-counts'>
                                                        <div onClick={(e) => {
                                                            cart.totalPrice += item.price
                                                            setCount(item.count++);
                                                        }}><FaPlus /></div>
                                                        <p>{item.count}</p>
                                                        <div onClick={() => {
                                                            if (item.count <= 0) {
                                                                item.count = 0
                                                            } else {
                                                                setCount(item.count--)
                                                                cart.totalPrice -= item.price
                                                            }
                                                        }}><FaMinus /></div>
                                                    </td>
                                                    
                                                </tr>

                                            )

                                            )
                                        }
                                    </tbody> : <tbody ><tr><td>{cart != null && !!cart.products && cart.products.length}</td></tr></tbody>
                            }
                        </table>
                    </div>
                    <div className="btn-items">
                        <div className="form-input">
                            <select
                                className="select-category"
                                name="payment"
                                onChange={(e) => onChange(e)}>
                                <option  > كاش </option>
                                <option  > بنكك </option>
                            </select>
                        </div>
                        <div className="form-input">
                            <select
                                className="select-category"
                                name="type"
                                onChange={(e) => onTypeChange(e)}>
                                <option  > سفري </option>
                                <option  > محلي </option>
                            </select>
                        </div>
                        <button onClick={() => cart != null ? addOrder() : toast.warning("لم يتم اضافة طلب")} className='btn-print'>طباعة <FaPrint /></button>
                        <div className="btn-both">
                            <button onClick={() => cart != null ? witeItems() : toast.warning("لم يتم اضافة طلب")} className='btn-wite'>انتظار</button>
                            <button onClick={() => removeItem()} className='btn-delete'>مسح</button>
                        </div>
                    </div>
                </div>

            </div >
        </>
    )
}

export default OrderItems
