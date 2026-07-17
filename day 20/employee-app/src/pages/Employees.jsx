import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EmployeeList from "../components/EmployeeList";
import Footer from "../components/Footer";
import {
  getEmployees,
  deleteEmployee,
} from "../services/employeeService";

function Employees() {
  const [employees, setEmployees] = useState([]);

  // Department Filter
  const [departmentFilter, setDepartmentFilter] = useState("");

  // Load Employees
  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.log("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Delete Employee
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(id);
        fetchEmployees();
      } catch (error) {
        console.log("Delete Error:", error);
      }
    }
  };

  // Filter Employees
  const filteredEmployees =
    departmentFilter === ""
      ? employees
      : employees.filter(
          (emp) => emp.department === departmentFilter
        );

  return (
    <>
      <Navbar />

      <div className="employees-page">
        <h1>Employee Management</h1>
        <p>View, Edit and Delete Employee Details</p>

        {/* Department Filter */}
        <div style={{ margin: "20px 0" }}>
          <label>
            <b>Filter by Department : </b>
          </label>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            style={{
              padding: "8px",
              marginLeft: "10px",
              borderRadius: "5px",
            }}
          >
            <option value="">All Departments</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Testing">Testing</option>
          </select>
        </div>

        <EmployeeList
          employees={filteredEmployees}
          deleteEmployee={handleDelete}
        />
      </div>

      <Footer />
    </>
  );
}

export default Employees;