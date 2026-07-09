import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getEmployees } from "../services/employeeService";

function Home() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Department Count
  const departmentCount = [
    ...new Set(employees.map((emp) => emp.department)),
  ].length;

  return (
    <>
      <Navbar />

      <div className="home-container">
        <h1>Employee Management System</h1>
        <p>Manage all employee details easily.</p>

        <div className="dashboard">

          <div className="card">
            <h2>{employees.length}</h2>
            <p>Total Employees</p>
          </div>

          <div className="card">
            <h2>{departmentCount}</h2>
            <p>Departments</p>
          </div>

        </div>

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

export default Home;