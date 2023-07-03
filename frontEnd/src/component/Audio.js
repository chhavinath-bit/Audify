import React, { useContext, useEffect }  from 'react'
import audioContext from '../context/audio/audioContext'
import AudioItem from './AudioItem';
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
    <div className='row'>
    <h2>your Audio</h2>
    {audios.map((ele)=>{
        return <AudioItem key={ele._id} ele={ele} />
        })}
     <Link id='toLogin' to="/Login"></Link>   
  </div>
  )
}

export default Audio
