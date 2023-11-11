import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditProduct = () => {
    const { id } = useParams()
    const nav = useNavigate();
    const [catogres, setCatogres] = useState([])
    const [product, setProduct] = useState([])
    useEffect(() => {
      axios.get('http://localhost:8000/get-categories')
        .then((result) => {
          if (result.data.state) {
            setCatogres(result.data.categories);
          } else {
            toast.error("اسم الستخدم موجود بالفعل")
  
          }
        })
        .catch(err => console.log(err))
        axios.get('http://localhost:8000/get-product/'+id)
        .then((result) => {
            if (result.data.state) {
                setProduct(result.data.product[0]);
            } else {
                toast.error("اسم الستخدم موجود بالفعل")

            }
        })
        .catch(err => console.log(err))
    }, [])
    const handleSubmit = async (e) => {
      e.preventDefault();
      await axios.put('http://localhost:8000/edit-product/'+id,product)
        .then((result) => {
          console.log(result)
          if (result.data.state) {
            toast.apply("تم تعديل صنف جديد بنجاح")
            console.log("تم تعديل صنف جديد بنجاح")
            nav("/home-admin/product/list")
            return;
          } else {
            toast.error("اسم الستخدم موجود بالفعل")
            console.log(("اسم الستخدم موجود بالفعل"))
          }
        })
        .catch(err => console.log(err))
  
    };
  return (
    <div className="form-container">
    <form className="form" onSubmit={handleSubmit}>
      <button className="exit" onClick={() => nav('/home-admin/product/list')}>
        X
      </button>
      <div className="add-form">
        <h1 className="new-product">
          إضافة عنصر
        </h1>
      </div>

      <div className="form-input">
        <input
          type="text"
        //   placeholder="الاسم"
          name="name"
          value={product.name}
          onChange={(e)=>{
            setProduct({...product,name:e.target.value})
          }}
        />
      </div>
      <div className="form-input">
        <input
          type="number"
          placeholder="السعر"
          name="price"
          value={product.price}
          onChange={(e)=>{
            setProduct({...product,price:e.target.value})
          }}
        />
      </div>

      <div className="form-input">
        <select
          className="select-category"
          name="category"
          onChange={(e)=>{
            setProduct({...product,category:e.target.value})
          }}
        >
          {catogres.map((c) => (
            <option key={c.id} value={c.category}>
              {c.category}
            </option>
          ))}
        </select>
      </div>

      <div className="form-input">
        <button className="product-btn">إضافة</button>
      </div>
    </form>
  </div>
  )
}

export default EditProduct
