import { Link } from "react-router-dom";

function Navbar(){

return(
<nav>

<h2>Employee System</h2>

<div>

<Link to="/">Home</Link>

<Link to="/employees">Employees</Link>

<Link to="/add">Add Employee</Link>

</div>

</nav>
)

}

export default Navbar;