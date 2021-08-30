import { useState, useRef, useLayoutEffect } from "react";
import "styles.css";
import "./WallAreaPage.css";
import BubbleButton from "components/BubbleButton";
import ActionButton from "components/ActionButton";
import Frame from "components/Frame";
import wallImg from "assets/wall-area.png";
import testImg from "assets/test-img.png";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initFrameArray } from "features/uiSlice";

export default function WallAreaPage() {
  let history = useHistory();
  const dispatch = useDispatch();
  const [numFrames, setNumFrames] = useState(1);
  const [sizeVal, setSizeVal] = useState("2m X 2.2m");
  const [sizePreset, setSizePreset] = useState("Large");
  const sizeInput = useRef(null);
  const [scale, setScale] = useState("Small (38%)");
  const frameAreaRef = useRef(null);
  const [frameAreaWidth, setFrameAreaWidth] = useState(0);

  useLayoutEffect(() => {
    if (frameAreaRef.current) {
      setFrameAreaWidth(frameAreaRef.current.offsetWidth);
    }
  });

  const handleSelectLayout = (layoutObj) => {
    console.log(layoutObj);
    dispatch(initFrameArray(layoutObj));
    history.push("/results", {
      areaWidth: calcFrameAreaWidth(),
      wallImage: wallImg,
      frameAreaWidth: frameAreaWidth,
      testImg: testImg,
      sizeVal: sizeVal,
      scale: scale,
    });
  };

  const inspireFrameLayout = [
    [{ width: 0.35, ratio: 1.6, left: 0.5 }],
    [{ width: 0.56, ratio: 0.625, left: 0.5 }],
    [
      { width: 0.35, ratio: 1.6, left: 0.3 },
      { width: 0.35, ratio: 1.6, left: 0.7 },
    ],
    [
      { width: 0.5, ratio: 0.625, left: 0.22 },
      { width: 0.5, ratio: 0.625, left: 0.78 },
    ],
    [
      { width: 0.35, ratio: 1.6, left: 0.3 },
      {
        width: 0.56,
        ratio: 0.625,
        left: 0.78,
        top: frameAreaWidth * 0.35 * 1.6 * 0.5,
      },
    ],
    [
      { width: 0.45, ratio: 1, left: 0.25 },
      { width: 0.45, ratio: 1, left: 0.75 },
    ],
    [
      { width: 0.35, ratio: 1.6, left: 0.1 },
      { width: 0.35, ratio: 1.6, left: 0.5 },
      { width: 0.35, ratio: 1.6, left: 0.9 },
    ],
    [
      {
        width: 0.38,
        ratio: 0.625,
        left: 0.1,
        top: frameAreaWidth * 0.26 * 1.6 * 0.4,
      },
      {
        width: 0.38,
        ratio: 0.625,
        left: 0.5,
        top: frameAreaWidth * 0.26 * 1.6 * 0.4,
      },
      {
        width: 0.38,
        ratio: 0.625,
        left: 0.9,
        top: frameAreaWidth * 0.26 * 1.6 * 0.4,
      },
    ],
    [
      { width: 0.26, ratio: 1.6, left: 0.13 },
      {
        width: 0.416,
        ratio: 0.625,
        left: 0.5,
        top: frameAreaWidth * 0.26 * 1.6 * 0.5,
      },
      { width: 0.26, ratio: 1.6, left: 0.87 },
    ],
    [
      {
        width: 0.416,
        ratio: 0.625,
        left: 0.13,
        top: frameAreaWidth * 0.26 * 1.6 * 0.5,
      },
      { width: 0.26, ratio: 1.6, left: 0.5 },
      {
        width: 0.416,
        ratio: 0.625,
        left: 0.87,
        top: frameAreaWidth * 0.26 * 1.6 * 0.5,
      },
    ],
    [
      { width: 0.35, ratio: 1, left: 0.1 },
      { width: 0.35, ratio: 1, left: 0.5 },
      { width: 0.35, ratio: 1, left: 0.9 },
    ],
  ];

  const numToPerString = (num) => {
    return num * 100 + "%";
  };

  const calcFrameAreaWidth = () => {
    const parsedDim = sizeVal
      .split(" X ")
      .map((value) => value.replace("m", ""))
      .map((value) => parseFloat(value));

    let parsedScale = parseInt(scale.replace(/\D/g, ""));

    let width = (parsedDim[0] * parsedDim[1] * parsedScale) / (2 * 2.2);
    console.log(width);
    return width;
  };

  const selectSize = (sizeOption) => {
    setSizePreset(sizeOption);
    if (sizeOption === "Large") {
      setSizeVal("2m X 2.2m");
    } else if (sizeOption === "Medium") {
      setSizeVal("1.8m X 2.2m");
    } else if (sizeOption === "Small") {
      setSizeVal("1.6m X 2.2m");
    } else if (sizeOption === "Custom") {
      sizeInput.current.focus();
    }
  };

  const changeSizeVal = (val) => {
    setSizeVal(val);
    setSizePreset("Custom");
  };

  return (
    <div className="WallAreaPage">
      <h1 className="PageTitle">Wall Area</h1>
      <div className="optionLayout">
        <span className="optionTitle">No. of frames:</span>
        <span className="BubbleContainer">
          {[1, 2, 3].map((numOption) => (
            <BubbleButton
              clicked={numFrames === numOption}
              onClick={() => setNumFrames(numOption)}
              className="numFrameBubble"
            >
              {numOption}
            </BubbleButton>
          ))}
        </span>
      </div>
      <div className="optionLayout wallSizeLayout">
        <span className="optionTitle">Wall Size:</span>
        <input
          ref={sizeInput}
          className="sizeInput"
          value={sizeVal}
          onChange={(event) => changeSizeVal(event.target.value)}
        />
      </div>
      <div className="BubbleContainer optionLayout">
        {["Large", "Medium", "Small", "Custom"].map((sizeOption) => (
          <BubbleButton
            clicked={sizePreset === sizeOption}
            onClick={() => selectSize(sizeOption)}
            className="sizeBubble"
          >
            {sizeOption}
          </BubbleButton>
        ))}
      </div>
      <div className="optionLayout">
        <span className="optionTitle">Scale:</span>
        <span className="BubbleContainer">
          {["Small (38%)", "Medium (53%)", "Large (68%)"].map((scaleOption) => (
            <BubbleButton
              clicked={scaleOption === scale}
              onClick={() => setScale(scaleOption)}
              className="scaleBubble"
            >
              {scaleOption}
            </BubbleButton>
          ))}
        </span>
      </div>
      <div className="imgList">
        {inspireFrameLayout
          .filter((layoutObj) => layoutObj.length === numFrames)
          .map((layoutObj) => (
            <div
              className="frameRoomContainer"
              onClick={() => handleSelectLayout(layoutObj)}
            >
              <img src={wallImg} className="roomImg" />
              <div
                className="frameArea"
                style={{ width: calcFrameAreaWidth() + "%" }}
              >
                <div className="framesContainer" ref={frameAreaRef}>
                  {layoutObj.map((frameObj) => (
                    <Frame
                      img={testImg}
                      className="framePos"
                      style={{
                        width: numToPerString(frameObj.width),
                        height:
                          frameAreaWidth * frameObj.width * frameObj.ratio,
                        left: frameObj.left
                          ? numToPerString(frameObj.left)
                          : "auto",
                        top: frameObj.top ? frameObj.top : "auto",
                        transform: frameObj.top
                          ? "translate(-50%, -50%)"
                          : "translate(-50%, 0)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
      <ActionButton
        className="WA-backButton"
        clicked={false}
        caretLeft={true}
        onClick={() => history.push("/")}
      >
        Back
      </ActionButton>
    </div>
  );
}
