import { useState, useRef, useLayoutEffect } from "react";
import "./FrameWall.css";
import "styles.css";
import Frame from "components/Frame";
import Draggable from "react-draggable";
import { useSelector } from "react-redux";

export default function FrameWall(props) {
  const { buttonIndex, frameIndex } = useSelector((state) => state.ui);
  const [frameAreaWidth, setFrameAreaWidth] = useState(0);
  const frameAreaRef = useRef(null);

  useLayoutEffect(() => {
    if (frameAreaRef.current) {
      setFrameAreaWidth(frameAreaRef.current.offsetWidth);
    }
  });

  const numToPerString = (num) => {
    return num * 100 + "%";
  };

  const handleClick = (ratio) => {
    props.setFrameRatio(ratio)
  }

  return (
    <div className="frameRoomContainer" onClick={props.onClick}>
      <img src={props.wallImage} className="roomImg" />
      <div
        className="frameArea"
        style={{ width: props.areaWidth + "%" }}
        ref={frameAreaRef}
      >
        {props.frameArray.map((frameObj, index) => (
          <div key={frameObj.key}>
            <Draggable
              disabled={
                !(
                  props.showButtons &&
                  index === frameIndex &&
                  buttonIndex === 1
                )
              }
            >
              <div>
                <Frame
                  onClick={() => handleClick(frameObj.ratio)}
                  frameIndex={index}
                  showButtons={props.showButtons}
                  img={frameObj.image}
                  className="framePos"
                  style={{
                    width: numToPerString(frameObj.width),
                    height: frameAreaWidth * frameObj.width * frameObj.ratio,
                    left: frameObj.left
                      ? numToPerString(frameObj.left)
                      : "auto",
                    top: frameObj.top ? frameObj.top * frameAreaWidth : "auto",
                    transform: frameObj.top
                      ? "translate(-50%, -50%)"
                      : "translate(-50%, 0)",
                  }}
                />
              </div>
            </Draggable>
          </div>
        ))}
      </div>
    </div>
  );
}
