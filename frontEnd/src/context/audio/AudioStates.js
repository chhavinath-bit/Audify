import React, { useState, useEffect } from "react";
import audioContext from "./audioContext";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const ffmpeg = createFFmpeg({ log: true });
const AudioStates = (props) => {
  const host = "http://localhost:5000"
  const audioIntially = [];
const [audios, setAudios] = useState(audioIntially);
const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();
  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  };

  useEffect(() => {
    load();
  }, []);

const fetchAllAudio = async ()=>{
  const response = await fetch(`${host}/api/audio/fetchallaudio`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
   
      "auth-token": localStorage.getItem("token")
    },
  });
  const Json= await response.json();
  setAudios(Json);
}
const addAudio= async (video, description, tag)=>{

  
  ffmpeg.FS("writeFile", "video1.mp4", await fetchFile(video));
    await ffmpeg.run(
      "-y",
      "-i",
      "video1.mp4",
      "-vn", 
      "-ar",
       "44100", 
       "-ac",
        "2",
         "-b:a",
          "256k", 
          "-f",
           "mp3",
      "out.mp3"
    );
    // Read the .gif file back from the FFmpeg file system
    const data = ffmpeg.FS("readFile", "out.mp3");
    console.log("audios data", data)
    const url = URL.createObjectURL(
      new Blob([data.buffer], {type: "audio/mpeg" })
    );
    console.log(url)
   setGif(url);
  
  const response = await fetch(`${host}/api/audio/addaudio`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.

    headers: {
      "Content-Type": "application/json",
   
      "auth-token": localStorage.getItem("token")
    },
   
    body: JSON.stringify({url, description, tag}), 
  });
  const Json= await response.json();
  console.log(Json);
   setAudios(audios.concat(Json));

}

const deleteAudio=async (id)=>{

  const response = await fetch(`${host}/api/audio/deleteaudio/${id}`, {
    method: "DELETE",

    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token")
    },
    
  });



let newAudio= audios.filter((audio)=>{return audio._id!==id})
setAudios(newAudio);
}

  return <audioContext.Provider value={{audios,setVideo, video, addAudio,fetchAllAudio, deleteAudio}}>{props.children}</audioContext.Provider>;
};

export default AudioStates;
