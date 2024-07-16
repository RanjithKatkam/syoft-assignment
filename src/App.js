import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
