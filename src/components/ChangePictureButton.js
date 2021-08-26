import React from "react";
import "./ChangePictureButton.css";
import "styles.css";

export default function ChangePictureButton(props){
  
    
  return(
		<div className="buttonContainer" id={props.index} onClick={props.onClick} 
			style={{
				left:(props.marginLeft * 100 + "%"), 
				top:(props.top),
				backgroundColor: props.backgroundColor}}
		>
			
		</div>
  )
}