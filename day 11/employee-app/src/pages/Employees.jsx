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

  return (
    <>
      <Navbar />

      <div className="employees-page">
        <h1>Employee Management</h1>
        <p>View, Edit and Delete Employee Details</p>

        <EmployeeList
          employees={employees}
          deleteEmployee={handleDelete}
        />
      </div>

      <Footer />
    </>
  );
}

export default Employees;