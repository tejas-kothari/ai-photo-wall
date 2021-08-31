import React, { useState, useEffect, useRef } from "react";
import "styles.css";
import "./ResultsPage.css";
import FrameWall from "components/FrameWall";
import ActionButton from "components/ActionButton";
import download_icon from "assets/download_icon.svg";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useDispatch, useSelector } from "react-redux";
import { resetFCB, setFrameArray } from "features/uiSlice";

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
      dispatch(setFrameArray(newArr));
    }
  };

  const handleResetChanges = () => {
    let newArr = [...frameArray];
    newArr[frameIndex].image = null;
    dispatch(setFrameArray(newArr));
  };

  const handleApplyChanges = () => {
    dispatch(resetFCB());
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
      <FrameWall
        showButtons={true}
        wallImage={location.state.wallImage}
        areaWidth={location.state.areaWidth}
        frameArray={frameArray}
      />
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
