import axios from "axios";

// Replace this URL with your MockAPI URL
const API_URL = "https://6a4b368bf5eab0bb6b62573d.mockapi.io/employees";

// Get all employees
export const getEmployees = () => {
  return axios.get(API_URL);
};

// Add employee
export const addEmployee = (employee) => {
  return axios.post(API_URL, employee);
};

// Update employee
export const updateEmployee = (id, employee) => {
  return axios.put(`${API_URL}/${id}`, employee);
};

// Delete employee
export const deleteEmployee = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

// Get employee by ID
export const getEmployeeById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};