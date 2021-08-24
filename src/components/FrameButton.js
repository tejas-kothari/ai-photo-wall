import React, { useState } from "react";
import "./FrameButton.css";
import "styles.css";

export default function FrameButton(props){
  const [buttonState, setButtonState] = useState(false);

  
  return(
		<div id={props.id} className="frame-button-container" style={{left:(props.marginLeft * 100 + "%"), top:(props.top),}}>
			<div className="frame-button" onClick={() => setButtonState(!buttonState)}>
				+			
			</div>
			{
				buttonState?
				<div className="button-options">
					<div id={props.id} className="add-button" onClick={props.onClickAdd}>
						Add New Frame
					</div>
					<hr className="divider"/>
					<div id={props.id} className="delete-button" onClick={props.onClickDelete}>
						Delete Frame
					</div>
				</div> 
			: null
			}
			
		</div>
  )
}