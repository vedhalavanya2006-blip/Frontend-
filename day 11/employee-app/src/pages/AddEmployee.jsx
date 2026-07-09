import {useState} from "react";
import {useNavigate} from "react-router-dom";


function AddEmployee(){


const navigate=useNavigate();


const [employee,setEmployee]=useState({

name:"",
email:"",
department:""

});


function submit(e){

e.preventDefault();


let old=
JSON.parse(localStorage.getItem("employees")) || [];


let newEmployee={

id:Date.now(),

...employee

};


localStorage.setItem(

"employees",

JSON.stringify(
[...old,newEmployee]
)

);


navigate("/employees");


}



return(

<form onSubmit={submit}>


<h1>Add Employee</h1>


<input
placeholder="Name"
onChange={
e=>setEmployee({
...employee,
name:e.target.value
})
}
/>


<input
placeholder="Email"
onChange={
e=>setEmployee({
...employee,
email:e.target.value
})
}
/>


<input
placeholder="Department"
onChange={
e=>setEmployee({
...employee,
department:e.target.value
})
}
/>


<button>
Add Employee
</button>


</form>

)

}


export default AddEmployee;