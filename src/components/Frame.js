import React, { useState } from "react";
import "./Frame.css";
import "styles.css";

export default function Frame(props){
  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
    	let img = event.target.files[0];
      setImage(URL.createObjectURL(img))
			console.log(props.img)
    }
  };

  return(
    <div className="frame-container">
    	<div className={"Frame " + props.className} style={props.style}>
				<label htmlFor={props.identifier} className="upload-label">
					{
						"Upload" 
					} 
				</label>
      	<img className="image" src={image===null ? props.img : image}/>
      	<br/>
    	</div>
    	<input type="file" id={props.identifier} className="upload-button" onChange={(e) => onImageChange(e)}/>
    </div>
  )
}
