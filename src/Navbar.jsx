import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css"; // Custom styles (if any)

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in (check for user data in localStorage)
  useEffect(() => {
    const userData = localStorage.getItem("useremail");
    if (userData) {
      setIsLoggedIn(true); // User is logged in
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []);

  // Function to handle menu close when a link is clicked
  const closeMenu = () => setMenuOpen(false);

  // Function to handle "User" navigation
  const handleUserClick = () => {
    navigate("/User");
    closeMenu();
  };

  // Function to handle logout action
  const handleLogout = () => {
    localStorage.removeItem("useremail"); // Remove user data from localStorage
    setIsLoggedIn(false); // Update state to reflect the logout
    navigate("/home"); // Redirect to home page after logout
    closeMenu(); // Close the menu if open
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
      <div className="container-fluid">
        {/* Navbar Brand */}
        <Link to="/home" className="navbar-brand" onClick={closeMenu}>
          MonkeyMoney<span className="dotcom">.com</span>
        </Link>

        {/* Bootstrap Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)} // Toggle collapse state
          aria-controls="navbarNav"
          aria-expanded={menuOpen ? "true" : "false"} // Set the aria-expanded dynamically
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div
          className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav mx-auto align-items-center gap-3">
            <li className="nav-item">
              <Link to="/InflationCal" className="nav-link" onClick={closeMenu}>
                คำนวณเงินเฟ้อ
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/IncomeExpense" className="nav-link" onClick={closeMenu}>
                บัญชีรายรับรายจ่าย
              </Link>
            </li>
          </ul>

          {/* User Section - Aligned to Right */}
          <ul className="navbar-nav ms-auto align-items-center">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-warning" onClick={handleUserClick}>
                    {localStorage.getItem("useremail")}
                  </span>
                </li>
                <li className="nav-item">
                  <span className="nav-link text-danger" onClick={handleLogout}>
                    ออกจากระบบ
                  </span>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/Login" className="nav-link text-warning" onClick={closeMenu}>
                  เข้าสู่ระบบ
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
