import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function EmployeeDashboard() {

  const employeeId = localStorage.getItem("employeeId");

  return (
    <>
      <Navbar />

      <div className="home-container">

        <h1>Employee Dashboard</h1>

        <h2 style={{ color: "#2563eb" }}>
          Welcome Employee
        </h2>

        <p style={{ fontSize: "18px", fontWeight: "bold" }}>
          Employee ID : {employeeId}
        </p>

        <div className="dashboard">

          <Link to="/myprofile" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="card">
              <h2>👤</h2>
              <p>My Profile</p>
            </div>
          </Link>

          <Link to="/salary" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="card">
              <h2>💰</h2>
              <p>Salary Details</p>
            </div>
          </Link>

          <Link to="/attendance" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="card">
              <h2>📅</h2>
              <p>Attendance</p>
            </div>
          </Link>

          <Link to="/leave" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="card">
              <h2>📝</h2>
              <p>Leave Apply</p>
            </div>
          </Link>

          <Link to="/notice" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="card">
              <h2>📢</h2>
              <p>Notice Board</p>
            </div>
          </Link>

          <Link to="/changepassword" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="card">
              <h2>🔒</h2>
              <p>Change Password</p>
            </div>
          </Link>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default EmployeeDashboard;