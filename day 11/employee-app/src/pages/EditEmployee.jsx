import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import EmployeeForm from "../components/EmployeeForm";
import Footer from "../components/Footer";
import {
  getEmployees,
  updateEmployee,
} from "../services/employeeService";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);

  // Fetch employee by ID
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await getEmployees();

        const emp = response.data.find(
          (item) => item.id === id
        );

        if (emp) {
          setEmployee(emp);
        } else {
          alert("Employee Not Found");
          navigate("/employees");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployee();
  }, [id, navigate]);

  // Update Employee
  const handleUpdate = async (updatedEmployee) => {
    try {
      await updateEmployee(id, updatedEmployee);
      alert("Employee Updated Successfully!");
      navigate("/employees");
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="edit-employee-page">
        <h1>Edit Employee</h1>

        {employee && (
          <EmployeeForm
            employee={employee}
            onSubmit={handleUpdate}
            buttonText="Update Employee"
          />
        )}
      </div>

      <Footer />
    </>
  );
}

export default EditEmployee;