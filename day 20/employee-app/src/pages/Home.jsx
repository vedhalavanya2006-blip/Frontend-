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

  // Dashboard Counts
  const departmentCount = [
    ...new Set(employees.map((emp) => emp.department)),
  ].length;

  const activeEmployees = employees.filter(
    (emp) => emp.status === "Active"
  ).length;

  const inactiveEmployees = employees.filter(
    (emp) => emp.status === "Inactive"
  ).length;

  const averageSalary =
    employees.length > 0
      ? Math.round(
          employees.reduce(
            (total, emp) => total + Number(emp.salary || 0),
            0
          ) / employees.length
        )
      : 0;

  return (
    <>
      <Navbar />

      <div className="home-container">

        <h1>Employee Management System</h1>

        <p>
          Welcome! Manage all employee details quickly and efficiently.
        </p>

        {/* Dashboard */}
        <div className="dashboard">

          <div className="card">
            <h2>{employees.length}</h2>
            <p>Total Employees</p>
          </div>

          <div className="card">
            <h2>{departmentCount}</h2>
            <p>Departments</p>
          </div>

          <div className="card">
            <h2>{activeEmployees}</h2>
            <p>Active Employees</p>
          </div>

          <div className="card">
            <h2>{inactiveEmployees}</h2>
            <p>Inactive Employees</p>
          </div>

          <div className="card">
            <h2>₹{averageSalary}</h2>
            <p>Average Salary</p>
          </div>

          <div className="card">
            <h2>{employees.slice(0, 5).length}</h2>
            <p>Recent Joinees</p>
          </div>

        </div>

        {/* Quick Actions */}
<div
  style={{
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    marginTop: "30px",
    flexWrap: "wrap",
  }}
>
  <Link to="/employees">
    <button className="home-btn">
      👨‍💼 View Employees
    </button>
  </Link>

  <Link to="/add">
    <button className="home-btn">
      ➕ Add Employee
    </button>
  </Link>

  <Link to="/admin">
    <button className="home-btn">
      🛡️ Admin Dashboard
    </button>
  </Link>

  {/* Employee Dashboard */}
  <Link to="/employee">
    <button className="home-btn">
      👤 Employee Dashboard
    </button>
  </Link>

</div>

        {/* Recent Employees */}
        <div
          style={{
            marginTop: "40px",
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Recent Employees</h2>

          {employees.length === 0 ? (
            <p>No Employees Found</p>
          ) : (
            <table className="employee-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {employees.slice(0, 5).map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.name}</td>
                    <td>{emp.department}</td>
                    <td>{emp.status || "Active"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>

      <Footer />
    </>
  );
}

export default Home;