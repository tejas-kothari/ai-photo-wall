import React, { useState } from "react";
import "./Frame.css";
import "styles.css";
import FrameButton from "components/FrameButton";

export default function Frame(props){
  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
    	let img = event.target.files[0];
      setImage(URL.createObjectURL(img))
    }
  };
  return(
    <div className="frame-container">
    	<div className={"Frame " + props.className} style={props.style}>
      	<img className="image" src={props.img}/>
      	<br/>
    	</div>
			<label for={props.identifier} className="upload-label" style={{}}> Upload </label>
    	<input type="file" id={props.identifier} className="upload-button" onChange={() => onImageChange}/>
    </div>
  )
}
