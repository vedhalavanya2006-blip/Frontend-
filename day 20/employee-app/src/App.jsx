import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

// Employee Pages
import MyProfile from "./pages/MyProfile";
import SalaryDetails from "./pages/SalaryDetails";
import Attendance from "./pages/Attendance";
import Leave from "./pages/Leave";
import Notice from "./pages/Notice";
import ChangePassword from "./pages/ChangePassword";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Home Page */}
        <Route path="/home" element={<Home />} />

        {/* Dashboards */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />

        {/* Employee Features */}
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/salary" element={<SalaryDetails />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/changepassword" element={<ChangePassword />} />

        {/* Employee Management */}
        <Route path="/employees" element={<Employees />} />
        <Route path="/add" element={<AddEmployee />} />
        <Route path="/edit/:id" element={<EditEmployee />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;