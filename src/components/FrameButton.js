import React, { useState } from "react";
import "./FrameButton.css";
import "styles.css";

export default function FrameButton(props){
  const [buttonState, setButtonState] = useState(false);

  
  return(
		<div id={props.id} className="frame-button-container" style={{marginLeft:props.marginLeft-12}}>
			<div className="frame-button" onClick={() => setButtonState(!buttonState)}>
				+			
			</div>
			{
				buttonState?
				<div className="button-options">
					<div className="add-button" onClick={props.onClickAdd}>
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