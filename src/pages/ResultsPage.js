import React, { useRef } from "react";
import "styles.css";
import "./ResultsPage.css";
import FrameWall from "components/FrameWall";
import ActionButton from "components/ActionButton";
import download_icon from "assets/download_icon.svg";
import { useHistory } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useDispatch, useSelector } from "react-redux";
import { resetFCB, changeImg } from "features/uiSlice";

export default function ResultsPage() {
  const {
    buttonIndex,
    frameIndex,
    frameArray,
    wallImage,
    wallSize,
    wallScale,
    frameAreaWidth,
  } = useSelector((state) => state.ui);

  let history = useHistory();
  const dispatch = useDispatch();
  const fileInputRef = useRef();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      dispatch(
        changeImg({
          frameIndex: frameIndex,
          image: URL.createObjectURL(event.target.files[0]),
        })
      );
    }
  };

  const handleResetChanges = () => {
    dispatch(
      changeImg({
        frameIndex: frameIndex,
        image: null,
      })
    );
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
      <h1 className="PageTitle standardPagePadding">Your AI Wall</h1>
      <div className="infoContainer standardPagePadding">
        <div style={{ width: 80 }}>
          <h3 className="infoTitle"> Wall Size </h3>
          <h3 className="infoContent">{wallSize}</h3>
        </div>
        <div style={{ width: 80 }}>
          <h3 className="infoTitle">Scale</h3>
          <h3 className="infoContent">{wallScale}</h3>
        </div>
      </div>
      <FrameWall
        showButtons={true}
        wallImage={wallImage}
        areaWidth={frameAreaWidth}
        frameArray={frameArray}
      />
      <div className="resultsDetails standardPagePadding">
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
      <div className="actionButtonContainer standardPagePadding">
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
