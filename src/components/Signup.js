import React, { useState,useContext } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import NoteContext from '../context/Notes/NoteContext'



const Signup = () => {
  const context = useContext(NoteContext)
  const{showAlert}=context;
  
  const [cred, setcred] = useState({name:"",email:"",password:"",cpassword:""})
  let navigate=useNavigate();
  
    const handle =async(e)=>
    {
          e.preventDefault();
          const {name,email,password}=cred;           
          const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
          method: "POST",
            headers: {
              "Content-Type": "application/json"
              // "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1YmRhYTBiYmZmMTdlOWQyODIzYjY2In0sImlhdCI6MTY4Mzc0MTM3M30.540Cm6Fr02Lzmr4XsLNfzkl8EU0zGaCMUHbPuI7pPiA",
            },
            body: JSON.stringify({ name,email,password }),
          });
           const json= await response.json();
           console.log(json)
           if(json.success)
           {
              //save the token and redirect
              localStorage.setItem('token',json.jwtData);
              navigate("/");
              showAlert("Account created successfully ") 
           }
           else
           {
                 showAlert("Sorry User Already Exist !!! ")                  
           }
      }  
  
      
  const onchange=(e)=>
  {
  setcred({...cred,[e.target.name]:e.target.value})
    }
  

return (
<div>

<div className="conatainer my-3">
    <h1 >Sign Up</h1>
    </div>
 
  <form onSubmit={handle}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onchange} value={cred.name} aria-describedby="emailHelp"/>
 </div>


  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onchange} value={cred.email} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>

  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" value={cred.password} onChange={onchange} name="password" minLength={5} reuired/>
  </div>

  <div className="mb-3">
    <label htmlFor="password" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" value={cred.cpassword} onChange={onchange} name="cpassword" minLength={5} reuired/>
  </div>

  
  <button type="submit" className="btn btn-primary">Submit</button>
  <div className="container my-4 mx--19"  >
     <span className="psw">Already have an Account <Link to="/login ">Log In here ?</Link></span>
  </div>
</form>
    </div>
  )
}

export default Signup
