import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import signup from '../signup.jpg'
const SignUp = (props) => {
    const [credentials, setCredentials]= useState({name:"",email:"", password:"", confirm_password:""})
    const submitCredential=async (event)=>{
      document.getElementById("errmsg").style.color="black";
        document.getElementById("errmsg").textContent="";
        event.preventDefault();
        if(credentials.name.length===0){
          document.getElementById("errmsg").style.color="red";
          document.getElementById("errmsg").textContent="Name should not be empty";
          setTimeout(()=>{
            document.getElementById("errmsg").style.color="black";
            document.getElementById("errmsg").textContent="";}, 3000)
              return;
          
        }
        if(credentials.email.length===0){
          document.getElementById("errmsg").style.color="red";
          document.getElementById("errmsg").textContent="E-mail should not be empty";
          setTimeout(()=>{
            document.getElementById("errmsg").style.color="black";
            document.getElementById("errmsg").textContent="";}, 3000)
              return;
          
        }
        if(credentials.password!==credentials.confirm_password || credentials.password.length===0){
          document.getElementById("errmsg").style.color="red";
            document.getElementById("errmsg").textContent="confirm password must be same as password";
            setTimeout(()=>{
          document.getElementById("errmsg").style.color="black";
          document.getElementById("errmsg").textContent="";}, 3000)
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
            console.log(json);
            if(json.errors==="User with email already exist"){
                document.getElementById("errmsg").textContent="Email is already exist try to login with email";
                setTimeout(()=>{
                  document.getElementById("errmsg").style.color="black";
                  document.getElementById("errmsg").textContent="";}, 3000)
                    return;
                
            }
            else if(json.errors==="Internal Server Error"){
                document.getElementById("errmsg").textContent="Internal Server Error";
                setTimeout(()=>{
                  document.getElementById("errmsg").style.color="black";
                  document.getElementById("errmsg").textContent="";}, 3000)
                    return;
                }
            else{
              document.getElementById("errmsg").textContent=json.errors[0].msg +" of "+json.errors[0].path;
              setTimeout(()=>{
                document.getElementById("errmsg").style.color="black";
                document.getElementById("errmsg").textContent="";}, 3000)
                  return;
              }
          }
       }
    const onChange=(e)=>{
        
        setCredentials({...credentials,[e.target.name] : e.target.value});
        console.log(credentials.name, credentials.email, credentials.password, credentials.confirm_password);
       
    }
  return (
<div className='authCotainer'>

<div className='signupCard shadow-lg d-flex flex-row'>
<div className='pageStyle'>

    <Link id="toHome" to="/">

   </Link> 
   <img src={signup} alt='' className='imgSingup' />
    </div>
        <div className='singUpCredential'>
        <h2 style={{marginBottom:"40px"}}>Create your account
        <hr/></h2>

       <form onSubmit={submitCredential}>
   <div className="form-group">
     
    <div className='d-flex align-items-center' >
    <i className="fa-solid fa-user mx-2"></i>
    <input style={{width:"290px"}} type="text" className="form-control my-2" name='name' value={credentials.name} id="fname" onChange={onChange} placeholder='Enter Username'/>
    </div>
    <div className='d-flex align-items-center' >
    <i className="fa-solid fa-envelope mx-2"></i>
    <input style={{width:"290px"}} type="email" className="form-control my-2" name='email' id="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email" />
    </div> 
   
     <div className='d-flex align-items-center' >
     <i className="fa-solid fa-key mx-2"></i>
     <input style={{width:"290px"}} type="password" className="form-control my-2" name='password' value={credentials.password} id="password" onChange={onChange} placeholder="Password" />
     </div>
    
 
     <div className='d-flex align-items-center' >
     <i className="fa-solid fa-key mx-2"></i>
     <input style={{width:"290px"}} type="password" className="form-control my-2" name='confirm_password' value={credentials.confirm_password} id="cpassword" onChange={onChange} placeholder="confirm Password" />
      </div>
     
     <p id="errmsg"></p>
   </div>
   <button type="submit" className="my-3 btn btn-dark" >Submit</button>
   <p>already have account? <Link to="/Login" style={{textDecoration:"none"}}>Login <i class="fa-solid fa-arrow-right"></i></Link></p>
 </form>
 
</div>
</div>
</div>

  )
}

export default SignUp
