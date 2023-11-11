import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddCatogres = () => {
  const [form, setForm] = useState({
    category: "",
    file_name: ""
  });
  const { category,file_name } = form;
  const navigate = useNavigate();
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const uploadFile = (ev) => {
    ev.preventDefault()
    const files = ev.target.files;
    const data = new FormData();
    data.set('files', files);
    setForm({ ...form, [ev.target.name]: files[0] });;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !file_name) {
      toast.warning("بعض الحقول  فارغة");
      return;
    }
    await axios.post('http://localhost:8000/add-category', form,
      {
        headers: { 'Content-type': 'multipart/form-data' }
      }
    )
      .then((result) => {
        if (result.data.state) {
          toast.apply("تم إضافة صنف  بنجاح")
          setForm({ [e.target.name]: "" });
          handelNav()
          return;
        } else {
          toast.error(" الصنف موجود بالفعل")
          console.log(result)
        }
      })
      .catch(err => toast.error(err))

  };
  const handelNav = () => {
    navigate('/home-admin/catogres/list')
  }
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
              placeholder="الاسم"
              name="category"
              value={category}
              onChange={onChange}
            />
          </div>
          <input type="file" className="form-input" name="file_name" onChange={uploadFile} />
          <div className="form-input">
            <button className="product-btn">إضافة</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCatogres
