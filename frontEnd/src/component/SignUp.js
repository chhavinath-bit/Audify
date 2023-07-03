import React, {useState} from 'react'
import { Link } from 'react-router-dom';
const SignUp = (props) => {
    const [credentials, setCredentials]= useState({name:"",email:"", password:"", confirm_password:""})
    const submitCredential=async (event)=>{
        document.getElementById("errmsg").textContent="";
        event.preventDefault();
        if(credentials.password!==credentials.confirm_password){
            document.getElementById("errmsg").textContent="confirm password must be same as password";
            return;
        }
        const {name, email, password} = credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
            
            method: "POST", 
        
            headers: {
              "Content-Type": "application/json",
            },
           
            body: JSON.stringify({name, email, password}), // body data type must match "Content-Type" header
          });
          const json= await response.json();
          console.log(json);
          setCredentials({name:"", email:"", password:"", confirm_password:""})
          if(json.success){
            localStorage.setItem("token", json.token);
            localStorage.setItem("name", json.name);
            props.setIsLogged(true);
            document.getElementById("toHome").click();
          }
          else{
            if(json.errors==="User with email already exist"){
                document.getElementById("errmsg").textContent="Email is already exist try to login with email";
            }
            else if(json.errors==="Internal Server Error"){
                document.getElementById("errmsg").textContent="Internal Server Error";
            }
          }
       }
    const onChange=(e)=>{
        
        setCredentials({...credentials,[e.target.name] : e.target.value});
        console.log(credentials.name, credentials.email, credentials.password, credentials.confirm_password);
       
    }
  return (
    <div>
      <form onSubmit={submitCredential}>
  <div className="form-group">
  <label htmlFor="fname">Name</label>
    <input type="text" className="form-control" name='name' value={credentials.name} id="fname" onChange={onChange} />
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" name='email' id="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email" />
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} id="password" onChange={onChange} placeholder="Password" />
  </div>
  <div className="form-group">
    <label htmlFor="cpassword">Confirm Password</label>
    <input type="password" className="form-control" name='confirm_password' value={credentials.confirm_password} id="cpassword" onChange={onChange} placeholder="Password" />
    <p id="errmsg"></p>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
<Link id="toHome" to="/">

</Link>
    </div>
  )
}

export default SignUp
