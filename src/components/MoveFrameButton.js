import React from "react";
import "./MoveFrameButton.css";
import "styles.css";

export default function MoveFrameButton(props){
  
    
  return(
		<div className="moveButtonContainer" id={props.index} onClick={props.onClick} 
			style={{
				left:(props.marginLeft * 100 + "%"), 
				top:(props.top),
				backgroundColor: props.backgroundColor}}
		>
			
		</div>
  )
}