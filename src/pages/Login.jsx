import React, {  useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
    const [form, setForm] = useState({
        name:"",
        user_name: "",
        password: "",
    });
    const { user_name, password } = form;
    const navigate = useNavigate();
    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        if(!form.name && !form.password){
            toast.error("بعض الحقول فارغه")
        }
        console.log("result")
        e.preventDefault();
        await axios.post('/api/auth/login', form)
            .then( (result) => {
                console.log("result",result)
                if (result.data.loginState) {
                    localStorage.setItem("user",JSON.stringify(result.data))
                    console.log(result)
                    if (result.data.isAdmin === 1) {    
                        navigate("/home-admin");
                    } else {
                        navigate("/home");
                    }
                } else {
                    toast.error(result.err)
                } 
           
                toast.error(result.data)
            })
            .catch(err => toast.error(err))
    };

    return (
        <>
      
       
            <div className="auth-container">
            <div className="logo-name">
        <p>Street Burger</p>
        </div>
                <form className="register-form" onSubmit={handleSubmit}>
                    <h1>تسجيل دخول</h1>
                    <div className="formInput">
                        <label>اسم المستخدم</label>
                        <input
                            type="text"
                            placeholder="اسم المستخدم "
                            name="user_name"
                            value={user_name}
                            onChange={onChange}
                        />
                    </div>

                    <div className="formInput">
                        <label>كلمة المرور</label>
                        <input
                            type="password"
                            placeholder="كلمة المرور"
                            name="password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <button type="submit" className="btn-grad">
                         دخول
                    </button>

                </form>
                <div className="fotter-about">
        <p>Alaa Aldeen Mohammed Wep App & Mobile & Desktop Call +249128449996</p>
        
        </div>
            </div>

      
       
        </>
    )
}

export default Login
