import React, {useState} from 'react'
import signup from '../signup.jpg'
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
      else{
          if(json.errors==="Please try to login with correct credentials" || json.errors==="Internal Server Error"){
            document.getElementById("errormsg").style.color="red";
          document.getElementById("errormsg").textContent=json.errors;
          setTimeout(()=>{
          document.getElementById("errormsg").style.color="black";
          document.getElementById("errormsg").textContent=""}, 3000)
          }
          else{
            document.getElementById("errormsg").style.color="red";
            document.getElementById("errormsg").textContent=json.errors.msg;
            setTimeout(()=>{
            document.getElementById("errormsg").style.color="black";
            document.getElementById("errormsg").textContent=""}, 3000)
          }
         
      }
   }
   const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name] : e.target.value});
}
  return (
    
    <div className='authCotainer'>
    {/* <div className='card shadow' id='cardofLogin' style={{height:"40vh",marginTop:"200px", width:"40vw",paddingTop:"40px", padding:"30px", borderRadius:"10px"}}>
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
  <p id="errormsg" className='mx-1'></p>
  <p>New user? <Link to="/Signup" style={{textDecoration:"none"}}>click here</Link></p>
</form>
<Link id="toHome" to="/">

</Link>
    </div> */}
    <div className='loginCard shadow-lg d-flex flex-row'>

        <div className='loginCredential'>
        <h2 style={{marginBottom:"30px"}}>Welcome back! 
        <hr/></h2>

        <form onSubmit={submitCredential}>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input style={{width:"290px"}} type="email" className="form-control my-1" name='email' id="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email" />

    <label htmlFor="password">Password</label>
    <input style={{width:"290px"}} type="password" className="form-control my-1" name='password' value={credentials.password} id="password" onChange={onChange} placeholder="Password" />
  </div>
  <button type="submit" className="my-4 btn btn-dark" >Submit</button>
  <p id="errormsg" className='mx-1'></p>
  <p>New user? <Link to="/Signup" style={{textDecoration:"none"}}>Sign up <i class="fa-solid fa-arrow-right"></i></Link></p>
</form>
 
</div>
<div className='loginStyle'>

<Link id="toHome" to="/">

</Link> 
<img src={signup} alt='' className='imgLogin' />
</div>
</div>
    </div>
  )
}

export default Login
