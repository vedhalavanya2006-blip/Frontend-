import { useEffect, useState } from "react";

function EmployeeForm({ addEmployee, updateEmployee, editEmployee }) {
  const [employee, setEmployee] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (editEmployee) {
      setEmployee(editEmployee);
    }
  }, [editEmployee]);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editEmployee) {
      updateEmployee(employee);
    } else {
      addEmployee(employee);
    }

    setEmployee({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
    });
  };

  return (
    <div className="form-container">
      <h2>{editEmployee ? "Update Employee" : "Add Employee"}</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={employee.firstName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={employee.lastName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={employee.email}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editEmployee ? "Update Employee" : "Add Employee"}
        </button>

      </form>
    </div>
  );
}

export default EmployeeForm;