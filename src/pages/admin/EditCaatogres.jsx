import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const EditCaatogres = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const handelNav = () => {
    navigate('/home-admin/catogres/list')
  }
  const [catogres, setCatogres] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8000/get-categories/' + id)
      .then((result) => {
        if (result.data.state) {
          setCatogres(result.data.categorie[0]);
        } else {
          toast.error("اسم الستخدم موجود بالفعل")
        }
      })
      .catch(err => console.log(err))
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (catogres ) {
      toast.warning("بعض الحقول  فارغة");
      return;
    }
    axios.put('http://localhost:8000/edit-categories/' + id, catogres)
      .then((result) => {
        if (result.data.state) {
          toast.success("تم تعديل صنف  بنجاح")
          console.log("تم تعديل صنف  بنجاح")
          navigate("/home-admin/catogres/list")
        } else {
          toast.error(" خطأ")
        }
      })
      .catch(err => console.log(err))
  };
  return (
    <div className='containers'>
      <button onClick={handelNav} className='btn_'>
        X
      </button>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-input">
            <input
              type="text"
              //   placeholder="الاسم"
              name="category"
              value={catogres.category}
              onChange={(e) => {
                setCatogres({ ...catogres, category: e.target.value })
              }}
            />
          </div>
          <div className="form-input">
            <button className="product-btn">تعديل</button>

          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCaatogres
