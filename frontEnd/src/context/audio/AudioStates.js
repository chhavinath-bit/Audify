import React, { useState, useEffect } from "react";
import audioContext from "./audioContext";
import { initializeApp } from "firebase/app";

import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const ffmpeg = createFFmpeg({ log: true });
const AudioStates = (props) => {
  const host = "http://localhost:5000";
  const audioIntially = [];
  const [audios, setAudios] = useState(audioIntially);
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  };

  useEffect(() => {
    load();
  }, []);
  const firebaseConfig = {
   apiKey: process.env.REACT_APP_OUR_SECRET_API,
  authDomain: "campus-audify.firebaseapp.com",
  projectId: "campus-audify",
  storageBucket: "campus-audify.appspot.com",
  messagingSenderId: "802394273530",
  appId: "1:802394273530:web:a7f9b0a787c3b7ea167b43"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Get a list of cities from your database
  // async function getCities(db) {
  //   const citiesCol = collection(db, "cities");
  //   const citySnapshot = await getDocs(citiesCol);
  //   const cityList = citySnapshot.docs.map((doc) => doc.data());
  //   return cityList;
  // }
  const fetchAllAudio = async () => {
    const response = await fetch(`${host}/api/audio/fetchallaudio`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",

        "auth-token": localStorage.getItem("token"),
      },
    });
    const Json = await response.json();
    setAudios(Json);
  };
  const addAudio = async (video, description, tag) => {
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
    console.log("audios data", data);
    let url;
    var d = new Date();
    var file = new File(
      [new Blob([data.buffer], { type: "audio/mpeg" })],
      d.valueOf(),
      { type: "audio/mpeg" }
    );

    console.log("file: ",file);
    console.log("time: ", d.getSeconds());
    const storage = getStorage();
 
  
    const storageRef = ref(storage, `${description}`.concat(`${d.getTime()}`));
   
    // 'file' comes from the Blob or File API
    const temp = await uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
    const anotherTenp= await getDownloadURL(storageRef)
      .then((curl) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", curl);
        xhr.send();

        // Or inserted into an <img> element
        console.log("url:", curl);
        url = curl;
      })
      .catch((error) => {
        // Handle any errors
      });
   

    const response = await fetch(`${host}/api/audio/addaudio`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",

        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ url, description, tag }),
    });
    const Json = await response.json();
    console.log("Json: ",Json);
    console.log(Json.url);
    setAudios(audios.concat(Json));
  };

  const deleteAudio = async (id) => {
    const response = await fetch(`${host}/api/audio/deleteaudio/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    let newAudio = audios.filter((audio) => {
      return audio._id !== id;
    });
    setAudios(newAudio);
  };

  return (
    <audioContext.Provider
      value={{ audios, setVideo, video, addAudio, fetchAllAudio, deleteAudio }}
    >
      {props.children}
    </audioContext.Provider>
  );
};

export default AudioStates;
