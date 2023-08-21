import React, { useContext, useEffect }  from 'react'
import audioContext from '../context/audio/audioContext'
import AudioItem from './AudioItem';
import loading from "../loading.gif"
import { Link } from 'react-router-dom';
const Audio = () => {
    const context= useContext(audioContext)
    const {audios, fetchAllAudio}= context;
    useEffect(()=>{
      if(localStorage.getItem("token")){
      fetchAllAudio();}
      else{
       document.getElementById("toLogin").click();
      }
    },[])
  return (
    <div className='p-4'>
    <span className='buttonAudio'>Hey {localStorage.getItem("name")}</span>
    <hr/>
    <p style={{fontSize:"22px"}}>Here are your converted audios</p>
    {/* <div className='w-100'><img style={{width:"250px", marginLeft:"auto"}} src={loading} alt=""></img></div> */}
    {audios.map((ele)=>{
        return <AudioItem key={ele._id} ele={ele} />
        })}
     <Link id='toLogin' to="/Login"></Link>   
  </div>
  )
}

export default Audio
