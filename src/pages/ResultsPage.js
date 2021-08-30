import React, { useState, useEffect, useRef } from "react";
import "styles.css";
import "./ResultsPage.css";
import Frame from "components/Frame";
import ActionButton from "components/ActionButton";
import download_icon from "assets/download_icon.svg";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Draggable from "react-draggable";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useDispatch, useSelector } from "react-redux";
import { activateFCB, initFrameArray } from "features/uiSlice";

export default function ResultsPage() {
  const { buttonIndex, frameIndex, frameArray } = useSelector(
    (state) => state.ui
  );

  const location = useLocation();
  let history = useHistory();
  const dispatch = useDispatch();
  const fileInputRef = useRef();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let newImg = URL.createObjectURL(event.target.files[0]);
      let newArr = [...frameArray];
      newArr[frameIndex].image = newImg;
      dispatch(initFrameArray(newArr));
    }
  };

  const handleAddFrame = (e) => {
    let frameArray = [...frameArray];
    let key = e.target.id;
    console.log(key);
    console.log(frameArray);
    console.log(frameArray[frameArray.length - 1]);
    let temp = { ...frameArray[key] };
    temp.key = frameArray[frameArray.length - 1].key + 1;
    console.log(temp);
    dispatch(initFrameArray([...frameArray, temp]));
    console.log(frameArray);
    console.log(frameArray);
  };

  const handleDeleteFrame = (e) => {
    let frameArray = [...frameArray];
    console.log(frameArray);
    console.log(e.target.id);
    let key = frameArray.findIndex((obj) => obj.key == e.target.id);
    console.log(key);
    if (key !== -1) {
      frameArray.splice(key, 1);
    }
    dispatch(initFrameArray(frameArray));
    console.log(frameArray);
  };

  const handleResetChanges = () => {
    let newArr = [...frameArray];
    newArr[frameIndex].image = null;
    dispatch(initFrameArray(newArr));
  };

  const handleApplyChanges = () => {
    dispatch(
      activateFCB({
        frameIndex: -1,
        buttonIndex: -1,
      })
    );
  };

  const downloadDocument = () => {
    var input = document.getElementById("ResultsPage");
    console.log(input);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth() * 0.85;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("download.pdf");
    });
  };

  return (
    <div className="ResultsPage" id="ResultsPage">
      <h1 className="PageTitle">Your AI Wall</h1>
      <div className="infoContainer">
        <div style={{ width: 80 }}>
          <h3 className="infoTitle"> Wall Size </h3>
          <h3 className="infoContent"> {location.state.sizeVal} </h3>
        </div>
        <div style={{ width: 80 }}>
          <h3 className="infoTitle"> Scale </h3>
          <h3 className="infoContent"> {location.state.scale} </h3>
        </div>
      </div>
      <div className="frameRoomContainer">
        <img src={location.state.wallImage} className="roomImg" />
        <div
          className="frameArea"
          style={{ width: location.state.areaWidth + "%" }}
        >
          <div>
            {frameArray.map((frameObj, index) => (
              <div key={frameObj.key}>
                <Draggable
                  disabled={!(index === frameIndex && buttonIndex === 1)}
                >
                  <div>
                    <Frame
                      frameIndex={index}
                      showButtons={true}
                      img={frameObj.image}
                      className="framePos"
                      style={{
                        width: frameObj.width * 100 + "%",
                        height:
                          location.state.frameAreaWidth *
                          frameObj.width *
                          frameObj.ratio,
                        left: frameObj.left
                          ? frameObj.left * 100 + "%"
                          : "auto",
                        top: frameObj.top ? frameObj.top : "auto",
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
      </div>
      <div className="resultsDetails">
        {buttonIndex === 0 ? (
          <div className="changeImgContainer">
            <ActionButton onClick={() => fileInputRef.current.click()}>
              Change image
            </ActionButton>
            <input
              type="file"
              hidden
              ref={fileInputRef}
              onChange={onImageChange}
            />
          </div>
        ) : (
          <div>Available At:</div>
        )}
      </div>

      <div className="actionButtonContainer">
        {buttonIndex === 0 ? (
          <>
            <ActionButton onClick={handleResetChanges}>Reset</ActionButton>
            <ActionButton onClick={handleApplyChanges}>Apply</ActionButton>
          </>
        ) : (
          <>
            <ActionButton
              caretLeft={true}
              onClick={() => history.push("/wall-area")}
            >
              Back
            </ActionButton>
            <ActionButton clicked={true} onClick={downloadDocument}>
              Download&nbsp;
              <img src={download_icon} />
            </ActionButton>
          </>
        )}
      </div>
    </div>
  );
}
