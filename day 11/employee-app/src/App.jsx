import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/employees" element={<Employees />} />

        <Route path="/add" element={<AddEmployee />} />

        <Route path="/edit/:id" element={<EditEmployee />} />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;