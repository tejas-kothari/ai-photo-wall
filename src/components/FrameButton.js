import React, { useState } from "react";
import "./FrameButton.css";
import "styles.css";
import add_delete from "assets/add_delete.svg";
import new_frame from "assets/new_frame.svg";
import delete_frame from "assets/delete_frame.svg"

export default function FrameButton(props) {
  const [buttonState, setButtonState] = useState(false);

  return (
    <div
      className="frame-button-container"
      style={{
        left: props.marginLeft * 100 + "%",
        top: props.top,
        transform: props.transform,
      }}
    >
      <div
        className="frame-button"
        onClick={() => setButtonState(!buttonState)}
      >
        <img src={add_delete} />
      </div>
      {buttonState ? (
        <div className="button-options">
          <div
            id={props.index}
            className="add-button"
            onClick={props.onClickAdd}
          >
            <img src={new_frame} />
            <span className="optionText"> Add New Frame </span>
          </div>
          <hr className="divider" />
          <div
            id={props.index}
            className="delete-button"
            onClick={props.onClickDelete}
          >
						<img src={delete_frame} />
            <span className="optionText"> Delete Frame </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
