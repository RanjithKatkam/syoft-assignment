import { useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login(params) {
    const [formData, setFormData] = useState({
        user_email: "",
        user_password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (formData.user_password.length < 8) {
            setError("password should have more than 8 characters");
        } else {
            try {
                const api = "https://syoft.dev/Api/userlogin/api/userlogin";
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                };
                const response = await fetch(api, options);
                const responseData = await response.json();
                if (!responseData.status) {
                    setError(responseData.msg);
                } else {
                    localStorage.setItem("userDetails", JSON.stringify(responseData.user_data[0]));
                    navigate("/");
                }
            } catch (error) {
                setError(error.message);
            }
        }
    };

    return (
        <div className="main-container">
            <div className="sub-container">
                <div className="sub1">
                    <h5>A WISE QUOTE ---- </h5>
                    <h1>
                        Get <br /> Everything <br /> You Want
                    </h1>
                    <h4>
                        You can get everything you want if you work hard, <br /> trust the process, and stick to the paln.
                    </h4>
                </div>
                <div className="sub2">
                    <img
                        src="https://res.cloudinary.com/dwgg5pyqk/image/upload/v1721111782/original-080a28c1780e3551336896167167c700_evcldn.jpg"
                        alt="logo"
                    />
                    <h1 className="welcome">Welcome Back</h1>
                    <p className="para">Enter your email and password to access your acount</p>
                    <form onSubmit={handleLogin} className="form">
                        <label htmlFor="user_email">Email</label>
                        <input type="email" name="user_email" value={formData.email} onChange={handleChange} required />
                        <label htmlFor="user_password">Password</label>
                        <input type="password" name="user_password" value={formData.password} onChange={handleChange} required />
                        {error !== "" ? <h4>*{error}</h4> : ""}
                        <div>
                            <button type="submit">Login</button>
                            <p>
                                Don't have an account?{"  "}
                                <Link className="link" to="/signup">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
