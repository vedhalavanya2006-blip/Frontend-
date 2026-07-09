import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import EmployeeForm from "../components/EmployeeForm";
import Footer from "../components/Footer";
import { addEmployee } from "../services/employeeService";

function AddEmployee() {
  const navigate = useNavigate();

  const handleAddEmployee = async (employee) => {
    try {
      await addEmployee(employee);
      alert("Employee Added Successfully!");
      navigate("/employees");
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Failed to add employee!");
    }
  };

  return (
    <>
      <Navbar />

      <div className="add-employee-page">
        <h1>Add Employee</h1>
        <p>Fill in the details below to add a new employee.</p>

        <EmployeeForm
          onSubmit={handleAddEmployee}
          buttonText="Add Employee"
        />
      </div>

      <Footer />
    </>
  );
}

export default AddEmployee;