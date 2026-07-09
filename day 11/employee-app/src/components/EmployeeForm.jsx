import React, { useState, useEffect } from "react";

function EmployeeForm({ employee, onSubmit, buttonText }) {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    email: "",
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        department: employee.department || "",
        email: employee.email || "",
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="employee-form-container">
      <form className="employee-form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {buttonText}
        </button>

      </form>
    </div>
  );
}

export default EmployeeForm;