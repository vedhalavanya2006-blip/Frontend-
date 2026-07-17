import React, { useState, useEffect } from "react";

function EmployeeForm({ employee, onSubmit, buttonText }) {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    email: "",
    phone: "",
    salary: "",
    joiningDate: "",
    status: "Active",
    address: "",
    image: "",
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        department: employee.department || "",
        email: employee.email || "",
        phone: employee.phone || "",
        salary: employee.salary || "",
        joiningDate: employee.joiningDate || "",
        status: employee.status || "Active",
        address: employee.address || "",
        image: employee.image || "",
      });
    } else {
      setFormData({
        name: "",
        department: "",
        email: "",
        phone: "",
        salary: "",
        joiningDate: "",
        status: "Active",
        address: "",
        image: "",
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

        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          <option>HR</option>
          <option>IT</option>
          <option>Finance</option>
          <option>Marketing</option>
          <option>Sales</option>
          <option>Testing</option>
        </select>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          pattern="[0-9]{10}"
          maxLength="10"
          required
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          min="0"
          required
        />

        <label>Joining Date</label>
        <input
          type="date"
          name="joiningDate"
          value={formData.joiningDate}
          onChange={handleChange}
          required
        />

        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option>Active</option>
          <option>Inactive</option>
          <option>On Leave</option>
        </select>

        <textarea
          name="address"
          placeholder="Employee Address"
          value={formData.address}
          onChange={handleChange}
          rows="3"
        />

        <input
          type="text"
          name="image"
          placeholder="Profile Image URL (Optional)"
          value={formData.image}
          onChange={handleChange}
        />

        <button type="submit">
          {buttonText}
        </button>

      </form>
    </div>
  );
}

export default EmployeeForm;