import { useState, useCallback } from "react";
import "styles.css";
import "./FrameCircleButton.css";
import { useSelector, useDispatch } from "react-redux";
import { activateFCB } from "features/uiSlice";

export default function FrameCircleButton(props) {
  const { frameIndex, buttonIndex } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [buttonWidth, setButtonWidth] = useState(0);
  const buttonRef = useCallback(
    (node) =>
      node ? setButtonWidth(node.getBoundingClientRect().width) : null,
    []
  );

  return (
    <div
      className={
        "FrameCircleButton " +
        (frameIndex === props.frameIndex && buttonIndex === props.buttonIndex
          ? "fcb-clicked "
          : " ") +
        props.className
      }
      style={{ height: buttonWidth, ...props.style }}
      ref={buttonRef}
      onClick={() =>
        dispatch(
          activateFCB({
            frameIndex: props.frameIndex,
            buttonIndex: props.buttonIndex,
          })
        )
      }
    >
      {props.children}
    </div>
  );
}
