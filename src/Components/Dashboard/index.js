import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./index.css";

export default function Dashboard(params) {
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const user = localStorage.getItem("userDetails");

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            setUserData(JSON.parse(localStorage.getItem("userDetails")));
        }
    }, [user, navigate]);

    if (!user) {
        return <div>Loading the data..........</div>;
    }

    return (
        <div className="dash-main-container">
            <Navbar />
            <div className="user-details-container">
                <div className="details">
                    <div className="profile-pic-container">
                        <img
                            src="https://res.cloudinary.com/dwgg5pyqk/image/upload/c_crop,ar_1:1/v1721129226/ashton-bingham-EQFtEzJGERg-unsplash_wokkdk.jpg"
                            alt={userData.user_firstname}
                        />
                        <div className="profile-inner">
                            <h1>{userData.user_firstname + " " + userData.user_lastname}</h1>
                            <h2>MERN Stack Developer</h2>
                            <h3>Passionate about crafting user interfaces that are both beautiful and functional.</h3>
                        </div>
                    </div>
                    <div className="profile-div">
                        <div className="inner1">
                            <p>Name</p>
                            <h3>{userData.user_firstname + " " + userData.user_lastname}</h3>
                        </div>
                        <div className="inner1">
                            <p>Email</p>
                            <h3 className="email1">{userData.user_email}</h3>
                        </div>
                    </div>
                    <div className="profile-div">
                        <div className="inner1">
                            <p>DOB</p>
                            <h3>4-10-2000</h3>
                        </div>
                        <div className="inner1">
                            <p>Mobile</p>
                            <h3>{userData.user_phone}</h3>
                        </div>
                    </div>
                    <div className="inner1 div1">
                        <p>Location</p>

                        <h3 className="media-location">{`${userData.user_city} ,Telangana, India ${userData.user_zipcode}`}</h3>
                    </div>
                    <div className="inner1 div1">
                        <p>Skills</p>
                        <h3 className="media-location">HTML, CSS, JavaScript, React, MongoDB, ExpressJS, NodeJS</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
