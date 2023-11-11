import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaHome,
  FaShoppingCart,
  FaShopify,
  FaUserCircle,
  FaSignInAlt,
  FaWpforms,
} from "react-icons/fa";
import '../css/said_bar.css'
const SidebarLeft = () => {

  const navigate = useNavigate();
  const  user = localStorage.getItem("user")
  const logoutUser = () => {
    localStorage.setItem("user",null)
    navigate("/");
  };

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
        <Link className="menu-links_item" to="/home-admin">
          <FaWpforms className="menu-icon" />
          <p>تقارير</p>
        </Link>
        <Link className="menu-links_item" to="/home-admin/catogres/list">
          <FaShoppingCart className="menu-icon" />
          <p> الاصناف</p>
        </Link>
        <Link className="menu-links_item" to="/home-admin/product/list">
          <FaShopify className="menu-icon" />

          <p>المنتجات</p>
        </Link>
        <Link className="menu-links_item" to="/home-admin/users/list">
          <FaUserCircle className="menu-icon" />
          <p> المستخدمين</p>
        </Link>

      </div>

      <div className="user-info">

        <button className="logout-btn" onClick={logoutUser}>
          <FaSignInAlt className="logout-icon" />
        </button>
      </div>
    </>
  );
};

export default SidebarLeft;
