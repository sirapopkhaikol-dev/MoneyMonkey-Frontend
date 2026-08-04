import { Link } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import './MonkeyMoney.css'; // Make sure to import the updated styles

export const MonkeyMoney = () => {
  return (
    <div className="centered-container">
      <div className="monkey-money-container">
        <img src="/webpage.png" alt="" />  
        <p className="monkey-money-description">
          MonkeyMoney คือเว็บไซต์ที่ใช้เทคโนโลยีปัญญาประดิษฐ์
          เพื่อช่วยการคำนวณอัตราเงินเฟ้อ และจัดการบัญชีรายรับรายจ่าย
          เพื่อให้คุณสามารถวางแผนการเงินได้อย่างมีประสิทธิภาพ ช่วยให้คุณสามารถ
          บริหารจัดการเงินได้ง่ายขึ้น 
        </p>
        <Link to="/InflationCal" className="btn btn-primary monkey-money-button">เริ่มต้นใช้งาน</Link>
      </div>
    </div>
  );
};
