import React, {  useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  FaUserCircle,
  FaSignInAlt,
} from "react-icons/fa";
import axios from "axios";
const SaidBarCacher = () => {
  const navigate = useNavigate();
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
  const logoutUser = () => {
    localStorage.setItem("user",null)
    navigate("/");
  };
  const  user = localStorage.getItem("user")
  return (
    <>
      <div className="menu-links">
        <div className="user-detail">
          <FaUserCircle className="user-icon" />
          <div className="user-welcome">
            مرحبآ
            <span className="user">
              {JSON.parse(user).name}
            </span>
          </div>
          </div>
          {
            catogres.map(items => (
              <NavLink className="menu-links_item" key={items.id} to={"/home/" + items.category}>
                {/* <FaAdn className="menu-icon" /> */}
                <img className="menu-icon"   src={'http://localhost:8000/'+items.file_name} alt="catogres"/>
                <p >{items.category}</p>
              </NavLink>
            ))
          }

        </div>

        <div className="user-info">
          <button className="logout-btn" onClick={logoutUser}>
            <FaSignInAlt className="logout-icon" />
          </button>
        </div>
      </>
      );
}

      export default SaidBarCacher
