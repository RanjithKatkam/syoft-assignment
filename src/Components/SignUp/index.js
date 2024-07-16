import { useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp(params) {
    const [formData, setFormData] = useState({
        user_firstname: "",
        user_lastname: "",
        user_email: "",
        user_password: "",
        user_phone: "",
        user_city: "Hyderabad",
        user_zipcode: "500090",
    });
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (formData.user_password.length < 8) {
            setError("password should have more than 8 characters");
        } else if (formData.user_phone.length > 10) {
            setError("mobile number should not exceed 10 digits!");
        } else {
            try {
                const api = "https://syoft.dev/Api/user_registeration/api/user_registeration";
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
                    const login_api = "https://syoft.dev/Api/userlogin/api/userlogin";
                    const login_options = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            user_email: formData.user_email,
                            user_password: formData.user_password,
                        }),
                    };
                    const login_response = await fetch(login_api, login_options);
                    const login_responseData = await login_response.json();
                    localStorage.setItem("userDetails", JSON.stringify(login_responseData.user_data[0]));
                    navigate("/");
                }
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                    <form onSubmit={handleSignUp} className="form">
                        <label htmlFor="user_firstname">FirstName</label>
                        <input type="text" name="user_firstname" value={formData.user_firstname} onChange={handleChange} required />
                        <label htmlFor="user_lastname">LastName</label>
                        <input type="text" name="user_lastname" value={formData.user_lastname} onChange={handleChange} required />
                        <label htmlFor="user_email">Email</label>
                        <input type="email" name="user_email" value={formData.user_email} onChange={handleChange} required />
                        <label htmlFor="user_password">Password</label>
                        <input type="password" name="user_password" value={formData.user_password} onChange={handleChange} required />
                        <label htmlFor="user_phone">Mobile No.</label>
                        <input type="number" name="user_phone" value={formData.user_phone} onChange={handleChange} required />
                        {error !== "" ? <h4>*{error}</h4> : ""}
                        <div>
                            <button type="submit">Sign Up</button>
                            <p>
                                Already have an account?{"  "}
                                <Link className="link" to="/login">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
