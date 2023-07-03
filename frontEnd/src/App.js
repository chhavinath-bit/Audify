import {
  BrowserRouter as Router,
  Routes,
  Route,
 
} from "react-router-dom";
import './App.css';
import React, {useState} from 'react'
import AudioStates from './context/audio/AudioStates';
import Home from './component/Home';
import Navbar from './component/Navbar';
import Login from "./component/Login";
import SignUp from "./component/SignUp";

function App() {
  const [isLogged, setIsLogged]= useState(localStorage.getItem("token")? true: false)
  return (
   <>
   <AudioStates>
   <Router>
   <Navbar isLogged={isLogged} setIsLogged={setIsLogged} />
             
        <Routes>
        <Route exact path="/"  element={<Home/>}>
         
        </Route>
        <Route exact path="/Login"  element={<Login setIsLogged={setIsLogged}/>}>
         
         </Route>
         <Route exact path="/Signup"  element={<SignUp setIsLogged={setIsLogged}/>}>
         
        </Route>
        </Routes>
        </Router>
   
  

</AudioStates>
</> 

  );
}

export default App;
  