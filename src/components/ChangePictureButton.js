import React from "react";
import "./ChangePictureButton.css";
import "styles.css";
import change_icon from "assets/change_icon.svg";

export default function ChangePictureButton(props) {
  return (
    <div
      className="buttonContainer"
      id={props.index}
      onClick={props.onClick}
      style={{
        left: props.marginLeft * 100 + "%",
        top: props.top,
        borderColor: props.borderColor,
				transform:props.transform,
      }}
    >
      <img src={change_icon} />
    </div>
  );
}
