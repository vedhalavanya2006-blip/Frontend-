import { useNavigate } from "react-router-dom";

function EmployeeList({ employees, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="table-container">

      <h2>Employee List</h2>

      <table>

        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {employees.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No Employees Found
              </td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/edit/${employee.id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default EmployeeList;