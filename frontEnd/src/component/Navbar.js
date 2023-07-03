
import { Link } from 'react-router-dom'
const Navbar = (props) => {
   
  const logout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    props.setIsLogged(false);
    document.getElementById("toLogin").click();
    
  }
  console.log("props.isLogged", props.isLogged)
  return (
    <>
    {(props.isLogged)?<div className='d-flex justify-content-center'><h5>{localStorage.getItem("name")}</h5> <button onClick={logout} className='btn btn-primary'>Log out</button> </div>: <div className='d-flex justify-content-end'><Link className='btn btn-primary' to="/Signup">sign Up</Link>
      <Link className='btn btn-primary' id='toLogin' to="/Login">login</Link></div>}
    </>
  )
}

export default Navbar
