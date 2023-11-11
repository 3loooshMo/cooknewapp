import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditUser = () => {
  const { id } = useParams()
  const [users, setUser] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/auth/users/'+id)
      .then((result) => {
        if (result.data.state) {
          setUser(result.data.user[0]);
        } else {
          toast.error("اسم الستخدم موجود بالفعل")
        }
      })
      .catch(err => console.log(err))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    axios.put('http://localhost:8000/api/auth/edit/'+id,users)
    .then((result) => {
      console.log(result)
      if (result.data.state) {
        navigate("/home-admin/users/list")
      } else {
        toast.error("اسم الستخدم موجود بالفعل")
      }
    })
    .catch(err => console.log(err))
  };
  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <button className="exit" onClick={() => navigate('/home-admin/users/list')}>
          X
        </button>
        <div className="add-form">
          <h1 className="new-product">
            تعديل مستخدم
          </h1>
        </div>

        <div className="form-input">
          <input
            type="text"
            // placeholder="الاسم"
            name="name"
            value={users.name}
            onChange={(e)=> {
              setUser({...users, name: e.target.value })
            }}
          />
        </div>
        <div className="form-input">
          <input
            type="text"
            // placeholder="اسم المستخدم"
            name="user_name"
            value={users.user_name}
            onChange={(e)=> {
              setUser({...users, user_name: e.target.value })
            }}
          />
        </div>
        <div className="form-input">
          <input
            type="password"
            // placeholder="كلمة المرور"
            name="password"
            value={users.password}
            onChange={
              (e)=> {
                setUser({...users, password: e.target.value })
              }
            }
          />
        </div>

        <div className="form-input">
          <select
            className="select-category"
            name="isAdmin"
            value={users.isAdmin}
            onChange={(e)=> {
              setUser({...users, isAdmin: e.target.value })
            }}
          >
            <option value="1">أدمن</option>
            <option value="0">مستخدم</option>

          </select>
        </div>

        <div className="form-input">
          {/* {isEditing ? ( */}
          <button className="product-btn">تعديل</button>
          {/* ) : (
  <button className="product-btn">Add Product</button>
)} */}
        </div>
      </form>
    </div>
  )
}

export default EditUser
