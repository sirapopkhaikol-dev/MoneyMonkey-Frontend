import React, { useState } from "react";
import { Link } from "react-router-dom";
import SubmitButton from "../SubmitButton";
import { useNavigate } from "react-router-dom";
import './register.css'; // As

export const Register = () => {
    const [formData, setFormData] = useState({
        email: "",
        pass: "",
        confirmpass: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (formData.pass !== formData.confirmpass) {
            alert("รหัสผ่านไม่ตรงกัน กรุณาลองใหม่!");
            return;
        }

        try {
            // Handle form data with local storage if available
            const localformData = JSON.parse(localStorage.getItem("inflationFormData"));
            if (localformData) {
                const bodyData = { ...localformData, ...formData };
                const response_local = await fetch("http://localhost:5000/app/resultsave", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bodyData),
                });

                const result_local = await response_local.json();
                console.log("Backend Response:", result_local);
            }

            // Send registration data to the server
            const response = await fetch('http://localhost:5000/app/regdata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            const status = response.status;

            if (status === 400) {
                alert("อีเมลนี้มีบัญชีแล้ว");
                return;
            } else {
                alert("ลงทะเบียนสำเร็จ");
                localStorage.setItem("useremail", "keep_login");
                navigate("/Login");
            }

            // Clear form data after submission
            setFormData({
                email: "",
                pass: "",
                confirmpass: ""
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-block">
            <div className="login-content">
                <h2>ลงทะเบียน</h2>
                <input
                    className="fill-input"
                    placeholder="อีเมล"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    required
                />
                <input
                    type="password"
                    className="fill-input"
                    placeholder="รหัสผ่าน"
                    name="pass"
                    value={formData.pass}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    className="fill-input"
                    placeholder="ยืนยันรหัสผ่าน"
                    name="confirmpass"
                    value={formData.confirmpass}
                    onChange={handleChange}
                    required
                />
                <SubmitButton text="ลงทะเบียน" type="submit" />
                <Link to="/Login" className="Register">
                    <h6>มีบัญชีอยู่แล้ว</h6>
                </Link>
            </div>
        </form>
    );
};
