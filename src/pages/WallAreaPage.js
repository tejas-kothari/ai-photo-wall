import { useState, useRef } from "react";
import "styles.css";
import "./WallAreaPage.css";
import BubbleButton from "components/BubbleButton";

export default function WallAreaPage() {
  const [numFrames, setNumFrames] = useState(1);
  const [sizeVal, setSizeVal] = useState("2m X 2.2m");
  const [sizePreset, setSizePreset] = useState("Large");
  const sizeInput = useRef(null);
  const [scale, setScale] = useState("Small (38%)");

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
    <div>
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
      <div className="BubbleContainer sizeBubbleContainer">
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
          {["Small (38%)", "Medium (42%)", "Large (68%)"].map((scaleOption) => (
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
    </div>
  );
}
