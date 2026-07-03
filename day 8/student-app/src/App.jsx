import { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  const [student, setStudent] = useState({
    name: "",
    id: "",
    phone: "",
    email: "",
    department: "",
    section: "",
    status: "Absent",
  });

  // Filter States
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [sectionFilter, setSectionFilter] = useState("All");

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const addStudent = () => {
    if (
      student.name === "" ||
      student.id === "" ||
      student.phone === "" ||
      student.email === "" ||
      student.department === "" ||
      student.section === ""
    ) {
      alert("Please fill all fields!");
      return;
    }

    setStudents([...students, student]);

    setStudent({
      name: "",
      id: "",
      phone: "",
      email: "",
      department: "",
      section: "",
      status: "Absent",
    });
  };

  // Filter Students
  const filteredStudents = students.filter((item) => {
    const departmentMatch =
      departmentFilter === "All" ||
      item.department === departmentFilter;

    const sectionMatch =
      sectionFilter === "All" ||
      item.section === sectionFilter;

    return departmentMatch && sectionMatch;
  });

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <h1>🎓 Student Management Dashboard</h1>
        <p>Manage student records easily and efficiently</p>
      </header>

      {/* Dashboard Cards */}
      <div className="dashboard">

        <div className="card total">
          <h2>{students.length}</h2>
          <p>Total Students</p>
        </div>

        <div className="card present">
          <h2>{students.filter((s) => s.status === "Present").length}</h2>
          <p>Present</p>
        </div>

        <div className="card absent">
          <h2>{students.filter((s) => s.status === "Absent").length}</h2>
          <p>Absent</p>
        </div>

      </div>

      {/* Main Section */}
      <div className="main">

        {/* Left Form */}
        <div className="form-box">

          <h2>➕ Add Student</h2>

          <input
            type="text"
            placeholder="Student Name"
            name="name"
            value={student.name}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Student ID"
            name="id"
            value={student.id}
            onChange={handleChange}
          />

          <input
            type="tel"
            placeholder="Phone Number"
            name="phone"
            value={student.phone}
            onChange={handleChange}
          />

          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={student.email}
            onChange={handleChange}
          />

          <select
            name="department"
            value={student.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            <option>CSE</option>
            <option>IT</option>
            <option>ECE</option>
            <option>EEE</option>
            <option>MECH</option>
            <option>CIVIL</option>
          </select>

          <select
            name="section"
            value={student.section}
            onChange={handleChange}
          >
            <option value="">Select Section</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
          </select>

          <select
            name="status"
            value={student.status}
            onChange={handleChange}
          >
            <option>Absent</option>
            <option>Present</option>
          </select>

          <button onClick={addStudent}>
            Add Student
          </button>

        </div>

        {/* Right Table */}
        <div className="table-box">

          <h2>📚 Student Records</h2>

          {/* Filter Section */}
          <div className="filter-box">

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="All">All Departments</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>

            <select
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
            >
              <option value="All">All Sections</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
              <option value="D">Section D</option>
            </select>

          </div>

          <table>

            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Department</th>
                <th>Section</th>
                <th>Attendance</th>
              </tr>
            </thead>

            <tbody>

              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="7">
                    No Student Records Found
                  </td>
                </tr>
              ) : (
                filteredStudents.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.id}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.department}</td>
                    <td>{item.section}</td>
                    <td>
                      <span
                        className={
                          item.status === "Present"
                            ? "presentBadge"
                            : "absentBadge"
                        }
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default App;