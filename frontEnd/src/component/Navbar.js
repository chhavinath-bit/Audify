import { Link } from "react-router-dom";
const Navbar = (props) => {
  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    const temp = await props.setIsLogged(false);
    document.getElementById("toLogin").click();
  };
 
  return (
   <>
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link style={{paddingLeft:"10px"}} className="navbar-brand" to="/">Audify</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item active" style={{ paddingLeft:"20px ",width:"90vw"}}>
      {console.log("props.isLogged: ", props.isLogged)}
      {(props.isLogged===true) &&  
        <div className="d-flex justify-content-end">
          <h5 style={{color:"white", marginTop:"6px", marginRight:"40px"}}>{localStorage.getItem("name")}</h5>{" "}
          <button onClick={logout} className="btn btn-primary">
            Log out
          </button>{" "}
        </div> }
  
      </li>
    </ul>
  </div>
</nav>
    
      

      <Link id="toLogin" to="/Login">
      </Link> 
      </>
  );
  
};

export default Navbar;
