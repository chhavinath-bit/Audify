import React, {useState} from 'react'
import { Link } from 'react-router-dom';
const Login = (props) => {
    const [credentials, setCredentials]= useState({email:"", password:""})
   
   const submitCredential=async (event)=>{
    event.preventDefault();
    fetch("");
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
    
        headers: {
          "Content-Type": "application/json",
        },
       
        body: JSON.stringify(credentials),
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
    <div className='container-fluid Page d-flex justify-content-center'>
    <div className='card shadow' style={{height:"35vh",marginTop:"200px", width:"40vw",paddingTop:"40px", padding:"30px", borderRadius:"10px"}}>
      <form onSubmit={submitCredential}>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" name='email' id="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email" />
   
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} id="password" onChange={onChange} placeholder="Password" />
  </div>
  <button type="submit" className="my-4 btn btn-dark" >Submit</button>
</form>
<Link id="toHome" to="/">

</Link>
    </div>
    </div>
  )
}

export default Login
