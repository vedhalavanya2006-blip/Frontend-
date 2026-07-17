import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import EmployeeForm from "../components/EmployeeForm";
import Footer from "../components/Footer";
import {
  getEmployeeById,
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

        const response = await getEmployeeById(id);

        setEmployee(response.data);

      } catch (error) {

        console.error(error);

        alert("Employee Not Found");

        navigate("/employees");

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

        {employee ? (

          <EmployeeForm
            employee={employee}
            onSubmit={handleUpdate}
            buttonText="Update Employee"
          />

        ) : (

          <h3 style={{ textAlign: "center" }}>
            Loading Employee...
          </h3>

        )}

      </div>

      <Footer />

    </>

  );

}

export default EditEmployee;