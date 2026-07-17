import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getEmployees } from "../services/employeeService";

function Attendance() {

  const [employee, setEmployee] = useState(null);


  useEffect(() => {
    loadEmployee();
  }, []);



  const loadEmployee = async () => {

    try {

      const response = await getEmployees();

      const employeeId = localStorage.getItem("employeeId");


      const emp = response.data.find(
        (item) => String(item.id) === String(employeeId)
      );


      setEmployee(emp);

    } 
    catch(error){

      console.log(error);

    }

  };




  if(!employee){

    return(

      <>
      <Navbar/>

      <div style={{
        padding:"50px",
        textAlign:"center"
      }}>

        <h2>
          Attendance Details Not Found
        </h2>

      </div>

      <Footer/>

      </>

    );

  }



  const workingDays = 26;


  const presentDays = employee.presentDays || 24;


  const absentDays = workingDays - presentDays;


  const attendance =
    ((presentDays / workingDays) * 100).toFixed(0);



  let status;


  if(attendance >= 90){

    status="Excellent";

  }
  else if(attendance >=75){

    status="Good";

  }
  else{

    status="Need Improvement";

  }




  return (

    <>


    <Navbar/>



    <div style={styles.container}>


      <h1 style={styles.title}>
        Attendance Details
      </h1>



      <div style={styles.card}>


        <img

        src={
          employee.image ||
          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        }

        alt="profile"

        style={styles.image}

        />



        <h2>
          {employee.name}
        </h2>



        <p>
          Employee ID : {employee.id}
        </p>


        <p>
          Department : {employee.department}
        </p>


        <p>
          Email : {employee.email}
        </p>



        <hr/>



        <div style={styles.boxContainer}>


          <div style={styles.box}>

            <h4>
              Working Days
            </h4>

            <h2>
              {workingDays}
            </h2>

          </div>




          <div style={styles.box}>

            <h4>
              Present
            </h4>

            <h2 style={{
              color:"green"
            }}>

              {presentDays}

            </h2>

          </div>




          <div style={styles.box}>

            <h4>
              Absent
            </h4>

            <h2 style={{
              color:"red"
            }}>

              {absentDays}

            </h2>

          </div>



        </div>




        <h2>
          Attendance : {attendance}%
        </h2>




        <div style={styles.progress}>

          <div

          style={{
            ...styles.progressBar,
            width:`${attendance}%`
          }}

          >

          </div>


        </div>




        <h3>

          Status :

          <span style={{
            color:"#2563eb",
            marginLeft:"10px"
          }}>

            {status}

          </span>


        </h3>



      </div>



    </div>




    <Footer/>


    </>

  );

}




const styles = {


container:{

padding:"40px",

background:"#f4f6f9",

minHeight:"100vh",

textAlign:"center"

},



title:{

marginBottom:"30px",

color:"#333"

},



card:{

width:"500px",

margin:"auto",

background:"#fff",

padding:"30px",

borderRadius:"20px",

boxShadow:"0 10px 25px rgba(0,0,0,0.15)"

},



image:{

width:"120px",

height:"120px",

borderRadius:"50%",

objectFit:"cover",

border:"4px solid #2563eb"

},



boxContainer:{

display:"flex",

justifyContent:"space-around",

marginTop:"25px",

gap:"15px"

},



box:{

background:"#f1f5f9",

padding:"15px",

borderRadius:"12px",

width:"130px"

},



progress:{

height:"20px",

background:"#ddd",

borderRadius:"20px",

overflow:"hidden",

margin:"20px 0"

},



progressBar:{

height:"100%",

background:"#22c55e",

borderRadius:"20px"

}


};


export default Attendance;