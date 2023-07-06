import React, {useContext, useState} from 'react'
import audioContext from '../context/audio/audioContext'
const AddAudio = () => {
    const context= useContext(audioContext)
    const {addAudio, setVideo, video}= context;

    const [audio, setAudio]= useState({ description:"", tag:"default"})
    const addAudioByinput=(event)=>{
      if(video===undefined){
        alert("please select a file")
          return 
      }
      if(audio.description.length<5){
        alert("please provide a valid description");
        return 
      }
     event.preventDefault();
     addAudio(video, audio.description, audio.tag);
     setAudio({ description:" ", tag:"default"})
     document.getElementById("video").value="";
    }
   const onChange=(e)=>{
   
        setAudio({...audio,[e.target.name] : e.target.value})
   }
   const onChangeFile=(e)=>{
    setVideo(e.target.files?.item(0));
   }
  return (
    <div className='p-4' >
    <form>
    <div className="form-group">
      {/* <label htmlFor="title">Email address</label> */}
      <input onChange={onChangeFile} type="file" className="form-control my-3" id="video" name="video" aria-describedby="emailHelp" placeholder="Enter email" />
      
    </div>
    <div className="form-group">
      <label htmlFor="description">Description</label>
      <input onChange={onChange} value={audio.description} type="text" className="form-control my-3" id="description" name='description' />
    </div>
   
    <button type="submit" className="btn btn-dark" onClick={addAudioByinput}>Convert</button>
  </form> 
  </div>
  )
}

export default AddAudio
