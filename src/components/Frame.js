import React, { useState } from "react";
import "./Frame.css";
import "styles.css";

export default function Frame(props){
  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
    	let img = event.target.files[0];
      setImage(URL.createObjectURL(img))
    }
  };
  return(
    <div className="frame-container" style={{marginTop: props.marginTop, marginBottom:props.marginBottom, marginLeft:props.marginLeft, marginRight:props.marginRight}}>
    	<div className="frame" style={{height:150, width:100}}>
      	<label className="size-label">{props.frameSize}</label>
      	<img className="image" src={image}/>
      	<br/>
    	</div>
    	<label htmlFor={props.identifier} className="upload-label" style={{fontSize: 10, margin:"auto auto"}}>Upload</label>
    	<input type="file" id={props.identifier} className="upload-button" onChange={onImageChange}/>
    </div>
  )
}