import React, { useContext, useState, useEffect } from "react";
import audioContext from "../context/audio/audioContext";

const AudioItem = (props) => {
  const [url, setUrl] = useState("");
  const [isloading, setIsloading] = useState(false);
  const context = useContext(audioContext);
  const { deleteAudio } = context;
  const { ele } = props;
  const createAudio = async (Aurl) => {
    try {
      setIsloading(true);
      const response = await fetch(Aurl);
      if (response.status === 200) {
        const blob = await response.blob();
        setIsloading(false);
        console.log(blob);
        // const audio = new Audio();
        // audio.controls = true;
        // document.getElementById("cardBody").appendChild(audio);

        setUrl(window.URL.createObjectURL(blob));
      } else {
        setIsloading(false);
        setUrl("");
      }
    } catch (err) {
      setIsloading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    createAudio(ele.url);
  }, [ele]);
  useEffect(() => {
    console.log(url);
  }, [url]);
  return (
    <div className="card my-3" style={{borderRadius:"10px"}}>
      <div className="card-body d-flex flex-row align-items-center" id="cardBody">
        {!isloading && url && (
          <audio controls>
            <source src={url} type="audio/mpeg" />
          </audio>
        )}

        {console.log("url in audioItem", ele.url)}
        <span className="mx-5"><span style={{fontWeight:"bold"}}>created on</span>: {ele.createdOn}</span>
        <span className="mx-4 align-items-center">{ele.description}</span>
       <span style={{marginLeft:"auto", marginRight:"10px"}}> <i
         
          className="fa-sharp fa-solid fa-trash mx-2 "
          onClick={() => {
            deleteAudio(ele._id);
          }}
        ></i>
        </span>
        <a
          href={ele.url}
          
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-solid fa-download mx2"></i>
        </a>
        
      </div>
    </div>
  );
};

export default AudioItem;
