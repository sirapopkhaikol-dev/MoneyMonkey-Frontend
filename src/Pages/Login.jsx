import React, { useState } from "react";
import SubmitButton from "../SubmitButton";
import { Link } from "react-router-dom";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoginBlock from "../LoginBlock";

export const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        pass: "",
    });

    const navigate = useNavigate(); // Initialize navigate hook for page redirection

    // ✅ Update state when input values change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send login data to server
            const response = await fetch("http://localhost:5000/app/logindata", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), // Send the form data as JSON
            });

            const result = await response.json();
            const status = response.status;

            console.log(status);
            if (status === 400) {
                alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง"); // Alert if login fails
                return;
            } else {
                
                localStorage.setItem("useremail", formData.email); // Save email to localStorage
                navigate("/User"); // Navigate to the /User page after successful login
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form className="login-block" onSubmit={handleSubmit}>
            <div className="login-content">
                <h2>เข้าสู่ระบบ</h2>
                <input
                    className="fill-input"
                    placeholder="อีเมล"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    className="fill-input"
                    placeholder="รหัสผ่าน"
                    name="pass"
                    value={formData.pass}
                    onChange={handleChange}
                />
                <SubmitButton text="เข้าสู่ระบบ" type="submit" />

                <Link to="/Register" className="Register">
                    <h6>ลงทะเบียนใช้งาน</h6>
                </Link>
            </div>
        </form>
    );
};