import {useParams,useNavigate} from "react-router-dom";
import {useState} from "react";


function EditEmployee(){


let {id}=useParams();

let navigate=useNavigate();


let data=
JSON.parse(localStorage.getItem("employees")) || [];


let emp=data.find(
(e)=>e.id==id
);


const [employee,setEmployee]=useState(emp);



function update(e){

e.preventDefault();


let updated=data.map(
(e)=>
e.id==id ? employee:e
);


localStorage.setItem(
"employees",
JSON.stringify(updated)
);


navigate("/employees");

}



return(

<form onSubmit={update}>


<h1>Edit Employee</h1>


<input

value={employee.name}

onChange={
e=>setEmployee({
...employee,
name:e.target.value
})
}

/>


<input

value={employee.email}

onChange={
e=>setEmployee({
...employee,
email:e.target.value
})
}

/>


<input

value={employee.department}

onChange={
e=>setEmployee({
...employee,
department:e.target.value
})
}

/>


<button>
Update
</button>


</form>


)


}


export default EditEmployee;