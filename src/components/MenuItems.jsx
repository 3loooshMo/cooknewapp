import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ReactContext } from '../app/store'
const MenuItems = () => {
    const { id } = useParams();
    let { setCart, cart } = useContext(ReactContext);
    const [product, setProduct] = useState([])
    useEffect(() => {
        axios.get('/get-prodect-items/' + id)
            .then((result) => {
                if (result.data.state) {
                    setProduct(result.data);
                } else {
                    setProduct(result.data);
                    // toast.error(" لا توجد منتجات ")
                }
            })
            .catch(err => console.log(err))
       
    }, [id])
    const addOrder = async (order) => {
        if (cart != null) {
            const existingProductIndex = cart.products.findIndex(p => p.id == order.id);
            if (existingProductIndex >= 0) { // exist in cart already
                const exsitingProduct = cart.products[existingProductIndex];
                cart.products[existingProductIndex] = exsitingProduct;
                toast.error("لا يمكن إضافة الطلب مرتين")
            } else {
                order.qty += 1;
                cart.products.push(order);
                cart.totalPrice += order.price;
                setCart(cart)
            }
        } else {
            cart = { products: [], totalPrice: 0 };
            order.qty = 1;
            cart.products.push(order);
            cart.totalPrice = order.price;
            setCart(cart)
        }
    }
    return (
        <div className='menu-items'>
            {
                product.state
                    ?
                    product.product.map((items) => (
                        <div key={items.id} className='items-menu'>
                            <img src={'http://localhost:8000/'+items.file_name} alt="hamburger" />
                            <p> {items.name}</p>
                            <p>{items.price}</p>
                            <button onClick={() => addOrder(items)
                            }
                                className='btn-add'>اضافة</button>
                        </div>
                    ))
                    : <h1>لا توجد منتجات</h1>
            }
        </div>

    )
}
export default MenuItems
