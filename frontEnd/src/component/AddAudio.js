import React, {useContext, useState} from 'react'
import audioContext from '../context/audio/audioContext'
const AddAudio = () => {
    const context= useContext(audioContext)
    const {addAudio, setVideo, video}= context;

    const [audio, setAudio]= useState({ description:" ", tag:"default"})
    const addAudioByinput=(event)=>{
     event.preventDefault();
     addAudio(video, audio.description, audio.tag);
     setAudio({ description:" ", tag:"default"})
    }
   const onChange=(e)=>{
   
        setAudio({...audio,[e.target.name] : e.target.value})
   }
   const onChangeFile=(e)=>{
    setVideo(e.target.files?.item(0))
   }
  return (
    <form>
    <div className="form-group">
      <label htmlFor="title">Email address</label>
      <input onChange={onChangeFile} type="file" className="form-control my-3" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter email" />
      
    </div>
    <div className="form-group">
      <label htmlFor="description">Password</label>
      <input onChange={onChange} value={audio.description} type="text" className="form-control my-3" id="description" name='description' />
    </div>
    <div className="form-check">
      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
      <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" className="btn btn-primary" onClick={addAudioByinput}>Submit</button>
  </form> 
  )
}

export default AddAudio
