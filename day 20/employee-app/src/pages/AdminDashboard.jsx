import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminDashboard() {
  return (
    <>
      <Navbar />

      <div className="home-container">

        <h1>Admin Dashboard</h1>

        <p>Welcome Admin! Manage Employees Easily.</p>

        <div className="dashboard">

          {/* Manage Employees */}
          <Link
            to="/employees"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="card">
              <h2>👨‍💼</h2>
              <p>Manage Employees</p>
            </div>
          </Link>

          {/* Add Employee */}
          <Link
            to="/add"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="card">
              <h2>➕</h2>
              <p>Add Employee</p>
            </div>
          </Link>

          {/* Dashboard */}
          <Link
            to="/home"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="card">
              <h2>📊</h2>
              <p>Dashboard</p>
            </div>
          </Link>

        </div>

        <br />

        <Link to="/employees">
          <button className="home-btn">
            View Employees
          </button>
        </Link>

        <Link to="/add">
          <button className="home-btn">
            Add Employee
          </button>
        </Link>

      </div>

      <Footer />
    </>
  );
}

export default AdminDashboard;