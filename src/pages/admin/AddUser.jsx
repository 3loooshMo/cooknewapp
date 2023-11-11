import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
const AddUser = () => {
    const nav = useNavigate()
    const [form, setForm] = useState({
        user_name: "",
        name: "",
        password: "",
        isAdmin:0
    });
    const { name, password } = form;
    const navigate = useNavigate();
    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !password) {
          return  toast.warning("بعض الحقول  فارغة");
        }
        await axios.post('http://localhost:8000/adduser', form)
            .then((result) => {
                console.log(result.data.state)
              if(result.data.state){
                toast.apply("تم إضافة مستخدم بنجاح")
                navigate("/home-admin/users/list")
              }else if(result.data.error.sqlMessage == "Duplicate entry '"+form.user_name+"' for key 'user_name'"){
               toast.error("اسم الستخدم موجود بالفعل")
               console.log(("اسم الستخدم موجود بالفعل"))
              }
            })
            .catch(err => console.log(err))
    };
    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <button className="exit" onClick={() => nav('/home-admin/users/list')}>
                    X
                </button>
                <div className="add-form">
                    <h1 className="new-product">
                        {/* {isEditing ? */}
                        إضافة مستخدم
                        {/* : "New Product"} */}
                    </h1>
                </div>

                <div className="form-input">
                    <input
                        type="text"
                        placeholder="الاسم"
                        name="name"
                        // value={name}
                        onChange={onChange}
                    />
                </div>
                <div className="form-input">
                    <input
                        type="text"
                        placeholder="اسم المستخدم"
                        name="user_name"
                        // value={name}
                        onChange={onChange}
                    />
                </div>
                <div className="form-input">
                    <input
                        type="password"
                        placeholder="كلمة المرور"
                        name="password"
                        // value={image}
                        onChange={onChange}
                    />
                </div>

                <div className="form-input">
                    <select
                        className="select-category"
                        name="isAdmin"
                        onChange={onChange}
                    >
                        <option value="1">أدمن</option>
                        <option value="0">مستخدم</option>
    
                    </select>
                </div>

                <div className="form-input">
                    {/* {isEditing ? ( */}
                    <button className="product-btn">إضافة</button>
                    {/* ) : (
          <button className="product-btn">Add Product</button>
        )} */}
                </div>
            </form>
        </div>
    )
}

export default AddUser
