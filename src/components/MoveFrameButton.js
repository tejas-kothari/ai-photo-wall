import React from "react";
import "./MoveFrameButton.css";
import "styles.css";
import move_icon from "assets/move_icon.svg";

export default function MoveFrameButton(props) {
  return (
    <div
      className="moveButtonContainer"
      id={props.index}
      onClick={props.onClick}
      style={{
        left: props.marginLeft * 100 + "%",
        top: props.top,
        borderColor: props.borderColor,
				transform:props.transform,
      }}
    >
			<img src={move_icon}/>
		</div>
  );
}
