import React, {useContext, useState} from 'react'
import audioContext from '../context/audio/audioContext' 

const AudioItem = (props) => {
    const context= useContext(audioContext)
    const {deleteAudio}= context;
   const {ele}= props;
  
  return (
    <div className="card my-3" >

  <div className="card-body">
    {/* <h5 className="card-title">{ele.title}</h5> */}
    
    <audio src={ele.url} controls />
    <p className="card-text">{ele.description}</p>
    <i className="fa-sharp fa-solid fa-trash mx-2" onClick={()=>{deleteAudio(ele._id)}}></i>
    <i className="fa-solid fa-download mx2"></i>
  </div>
</div>
  )
}

export default AudioItem
