import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import './InflationCal.css'; // Assuming you have a CSS file for this component

const PredictUrl = "http://localhost:5050/predict";

export const InflationCal = () => {
  const savedFormData = JSON.parse(localStorage.getItem("inflationFormData")) || {
    Money_input: "",
    Year_input: "",
    Result: "",
    Percentage: ""
  };

  const [formData, setFormData] = useState(savedFormData);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    localStorage.setItem("inflationFormData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleCalculate = async (e) => {
    e.preventDefault();
    
    const money = parseFloat(formData.Money_input);
    const years = parseInt(formData.Year_input);

    if (isNaN(money) || money <= 0 || isNaN(years) || years <= 0) {
        alert("กรุณากรอกค่าที่ถูกต้อง!");
        return;
    }

    try {
        setLoading(true);

        const response = await fetch(PredictUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "n_years": years,
                "initial_amount": money
            })
        });

        if (!response.ok) {
            throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูลจาก API!");
        }

        const data = await response.json();

        if (data.length > 0) {
            const lastEntry = data[data.length - 1];

            const calculatedResult = parseFloat(lastEntry.amount).toFixed(2);
            const percent = ((calculatedResult - money) / money * 100).toFixed(2);

            setFormData((prev) => ({
                ...prev,
                Result: calculatedResult,
                Percentage: percent
            }));

            setModalShow(true);
        } else {
            throw new Error("API response does not have expected data format.");
        }
    } catch (error) {
        alert("ไม่สามารถเชื่อมต่อกับ API ได้!");
        console.error("Error:", error);
    } finally {
        setLoading(false);
    }
};

  const handleSaveAndClose = async () => {
    const email = localStorage.getItem("useremail");

    if (!email) {
      console.log("กรุณาเข้าสู่ระบบก่อนบันทึกข้อมูล!");
      setIsRedirecting(true);
      navigate("/Login");
      return;
    }

    try {
      const localformData = JSON.parse(localStorage.getItem("inflationFormData"));
      console.log("Local Form Data:", localformData);

      if (localformData) {
        localformData.email = email;

        const response = await fetch("http://localhost:5000/app/resultsave", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(localformData),
        });

        if (!response.ok) {
          throw new Error("Failed to save data to the server.");
        }

        const result = await response.json();
        console.log("Backend Response:", result);

        localStorage.removeItem("inflationFormData");

        navigate("/User");
      } else {
        console.log("No form data found in localStorage.");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setModalShow(false);
  };

  return (
    <div className="centered-container">
      <div className="monkey-money-container">
        <h2>คำนวณเงินเฟ้อ</h2>
        <form onSubmit={handleCalculate}>
          <div className="form-group">
            <label htmlFor="Money_input">จำนวนเงินเริ่มต้น (บาท)</label>
            <input
              type="number"
              name="Money_input"
              value={formData.Money_input}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Year_input">ระยะเวลา (ปี)</label>
            <input
              type="number"
              name="Year_input"
              value={formData.Year_input}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <Button type="submit" variant="warning" className="mt-3" disabled={loading}>
            {loading ? "คำนวณ..." : "คำนวณ"}
          </Button>
        </form>

        {/* Modal for showing result */}
        <Modal show={modalShow} onHide={() => setModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>ผลลัพธ์การคำนวณ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>ผลลัพธ์: {formData.Result} บาท</p>
            <p>เปอร์เซ็นต์การเพิ่มขึ้น: {formData.Percentage} %</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalShow(false)}>
              ปิด
            </Button>
            <Button variant="success" onClick={handleSaveAndClose}>
              บันทึกข้อมูล
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
