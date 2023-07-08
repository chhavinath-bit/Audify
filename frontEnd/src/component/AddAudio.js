import React, {useContext, useState} from 'react'
import audioContext from '../context/audio/audioContext'
const AddAudio = () => {
    const context= useContext(audioContext)
    const {addAudio, setVideo, video, addAudioByUrl}= context;
   const [videoUrl, setVideoUrl]= useState("");
    const [audio, setAudio]= useState({ description:"", tag:"default"})
    const addAudioByinput=(event)=>{
      
       event.preventDefault();
       if(audio.description.length<5){
        alert("please provide a valid description");
        return 
      }
      if(videoUrl!==""){
       addAudioByUrl(videoUrl,audio.description);
       setVideoUrl("");
       setAudio({ description:" ", tag:"default"})
       return;
      }
      if(video===undefined ){
        alert("please select a file or give url id")
          return 
      }
     
    
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
   const onChangeUrl =(e)=>{
     setVideoUrl(e.target.value);
   }
  return (
    <div className='p-4' >
    <form>
    <div className="form-group">
      {/* <label htmlFor="title">Email address</label> */}
      <input onChange={onChangeUrl} type="text" className="form-control my-3" name="url" value={videoUrl} placeholder='put the id of youtube video'></input>
     <div className='d-flex flex-row align-items-center'> <hr style={{width:"47vw"}} /> <span className='mx-1'>Or</span><hr style={{width:"47vw"}} /></div>
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
