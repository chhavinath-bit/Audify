import React, {useState} from 'react'
import { Link } from 'react-router-dom';
const Login = (props) => {
    const [credentials, setCredentials]= useState({email:"", password:""})
   
   const submitCredential=async (event)=>{
    event.preventDefault();
    fetch("");
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
    
        headers: {
          "Content-Type": "application/json",
        },
       
        body: JSON.stringify(credentials), // body data type must match "Content-Type" header
      });
      const json= await response.json();
      console.log(json);
      setCredentials({email:"", password:""})
      if(json.success){
        localStorage.setItem("token", json.token);
        localStorage.setItem("name", json.name);
        props.setIsLogged(true);
        document.getElementById("toHome").click();
      }
   }
   const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name] : e.target.value});
}
  return (
    <div>
      <form onSubmit={submitCredential}>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" name='email' id="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email" />
   
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} id="password" onChange={onChange} placeholder="Password" />
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
<Link id="toHome" to="/">

</Link>
    </div>
  )
}

export default Login
