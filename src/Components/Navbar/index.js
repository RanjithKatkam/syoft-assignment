import { useNavigate } from "react-router-dom";
import "./index.css";

function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("userDetails");
        navigate("/login");
    };
    return (
        <div className="header">
            <img
                src="https://res.cloudinary.com/dwgg5pyqk/image/upload/v1721111782/original-080a28c1780e3551336896167167c700_evcldn.jpg"
                alt="logo"
                className="nav-logo"
            />
            <img
                src="https://res.cloudinary.com/dwgg5pyqk/image/upload/v1702493738/willoy-purple-user-icon_dd33u5.png"
                alt="profile"
                className="profile"
            />

            <button onClick={handleLogout} className="a logout-button">
                Logout
            </button>
        </div>
    );
}

export default Navbar;
