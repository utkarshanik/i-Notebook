import React, { useState,useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import NoteContext from '../context/Notes/NoteContext'
import {Link} from 'react-router-dom'

const Login = () => {
const context = useContext(NoteContext)
const{showAlert}=context;

const [cred, setcred] = useState({email:"",password:""})
let navigate=useNavigate();

// localhost:5000/api/auth/getuser

const handle =async(e)=>
  {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
         
        method: "POST",
          headers: {
            "Content-Type": "application/json"
            // "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1YmRhYTBiYmZmMTdlOWQyODIzYjY2In0sImlhdCI6MTY4Mzc0MTM3M30.540Cm6Fr02Lzmr4XsLNfzkl8EU0zGaCMUHbPuI7pPiA",
          },
          body: JSON.stringify({ email:cred.email,password:cred.password }),
        });
         const json= await response.json();
         console.log(json)
         if(json.success)
         {
            //save the token and redirect
            localStorage.setItem('token',json.jwtData);
            navigate("/");
            showAlert("Login Successful")

         }
         else
         {
               showAlert("Please Enter Valid Data") 
         }
    }  

    
const onchange=(e)=>
{
setcred({...cred,[e.target.name]:e.target.value})
  }
  return (
    <div>
    <div className="conatainer my-3">
    <h1 >Login</h1>
    </div>
 
  <form onSubmit={handle}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onchange} value={cred.email} aria-describedby="emailHelp" autoComplete="current-email"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>

  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" value={cred.password} onChange={onchange} name="password" autoComplete="current-password"/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
 <div className="container my-4 mx--19"  >
     <span className="psw">Not Registered <Link to="/signup">Create an Account ?</Link></span>
  </div>
    </div>
  )
}

export default Login
