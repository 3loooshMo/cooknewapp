import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const [catogres, setCatogres] = useState([])
  const nav = useNavigate();
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
  }, [])
  const  user = localStorage.getItem("user")

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "بيرقر",
    user: JSON.parse(user).user_name,
    file_name: ""
  });

  const uploadFile = (ev) => {
    ev.preventDefault()
    const files = ev.target.files;
    const data = new FormData();
    data.set('files', files);
    setForm({ ...form, [ev.target.name]: files[0] });
    console.log(form)
  }
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.file_name) {
      toast.warning("بعض الحقول  فارغة");
      return;
    }
    await axios.post('http://localhost:8000/add-product', form, {
      headers: { 'Content-type': 'multipart/form-data' }
    })
      .then((result) => {
        console.log(result)
        if (result.data.state) {
          toast.apply("تم إضافة صنف جديد بنجاح")
          setForm({ [e.target.name]: "" });
          nav("/home-admin/product/list")
          return;
        } else {
          toast.error(" المنتج موجود بالفعل")
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
            placeholder="الاسم"
            name="name"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-input">
          <input
            type="number"
            placeholder="السعر"
            name="price"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-input">
          <select
            className="select-category"
            name="category"
            onChange={(e) => onChange(e)}
          >
            {
              catogres.map((c) => (
                <option key={c.id} value={c.category}>
                  {c.category}
                </option>
              )
              )
            }
          </select>
        </div>
        <input type="file" className="form-input" name="file_name" onChange={uploadFile} />
        <div className="form-input">
          <button className="product-btn">إضافة</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
