import React, { useState, useEffect, useRef } from "react";
import "styles.css";
import "./ResultsPage.css";
import Frame from "components/Frame";
import FrameButton from "components/FrameButton";
import ActionButton from "components/ActionButton";
import MoveFrameButton from "components/MoveFrameButton";
import ChangePictureButton from "components/ChangePictureButton";
import download_icon from "assets/download_icon.svg";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Draggable from "react-draggable";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ResultsPage() {
  const location = useLocation();
  let history = useHistory();

  const bottomMenuOptions = {
    FrameInfo: "Frame Info",
    ChangeImage: "Change Image",
  };

  const [frameArray1, setframeArray1] = useState(location.state.layout);
  const [bottomMenu, setBottomMenu] = useState(bottomMenuOptions.FrameInfo);
  const [currentFrame, setCurrentFrame] = useState(null);
  const [currentButton, setCurrentButton] = useState(null);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    let frameArray = [...frameArray1];
    for (var i = 0; i < frameArray.length; i++) {
      frameArray[i].key = i;
    }
    console.log(frameArray);
    setframeArray1(frameArray);
  }, []);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      console.log(img);
      let frameArray = [...frameArray1];
      frameArray[currentFrame].image = URL.createObjectURL(img);
      setframeArray1(frameArray);
      console.log(frameArray1);
    }
  };

  const handleAddFrame = (e) => {
    let frameArray = [...frameArray1];
    let key = e.target.id;
    console.log(key);
    console.log(frameArray);
    console.log(frameArray[frameArray.length - 1]);
    let temp = { ...frameArray[key] };
    temp.key = frameArray[frameArray.length - 1].key + 1;
    console.log(temp);
    setframeArray1([...frameArray1, temp]);
    console.log(frameArray);
    console.log(frameArray1);
  };

  const handleDeleteFrame = (e) => {
    let frameArray = [...frameArray1];
    console.log(frameArray);
    console.log(e.target.id);
    let key = frameArray.findIndex((obj) => obj.key == e.target.id);
    console.log(key);
    if (key !== -1) {
      frameArray.splice(key, 1);
    }
    setframeArray1(frameArray);
    console.log(frameArray1);
  };

  const handleChangeButton = (object) => {
    if (currentFrame !== object.key) {
      setCurrentFrame(object.key);
      setCurrentButton("ChangePicture");
      setBottomMenu(bottomMenuOptions.ChangeImage);
    } else if (
      currentFrame === object.key &&
      currentButton === "ChangePicture"
    ) {
      setCurrentFrame(null);
      setBottomMenu(bottomMenuOptions.FrameInfo);
      setCurrentButton(null);
    } else if (
      currentFrame === object.key &&
      currentButton !== "ChangePicture"
    ) {
      setBottomMenu(bottomMenuOptions.ChangeImage);
      setCurrentButton("ChangePicture");
    }
    console.log(object.image);
    setImage(object.image);
  };

  const handleMoveButton = (object) => {
    if (currentFrame !== object.key) {
      setCurrentFrame(object.key);
      setCurrentButton("Move");
      setBottomMenu(bottomMenuOptions.FrameInfo);
    } else if (currentFrame === object.key && currentButton === "Move") {
      setCurrentFrame(null);
      setCurrentButton(null);
    } else if (currentFrame === object.key && currentButton !== "Move") {
      setCurrentButton("Move");
    }
  };

  const handleResetChanges = () => {
    let frameArray = [...frameArray1];
    frameArray[currentFrame].image = image;
    setframeArray1(frameArray);
    setBottomMenu(bottomMenuOptions.FrameInfo);
    setCurrentFrame(null);
    setCurrentButton(null);
  };

  const handleApplyChanges = () => {
    setBottomMenu(bottomMenuOptions.FrameInfo);
    setCurrentFrame(null);
    setCurrentButton(null);
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
    <div className="ResultsPage">
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
            {frameArray1.map((frameObj, index) => (
              <div key={frameObj.key}>
                <Draggable
                  disabled={
                    currentFrame == frameObj.key && currentButton === "Move"
                      ? false
                      : true
                  }
                >
                  <div>
                    {/* <FrameButton
                      index={frameObj.key}
                      marginLeft={frameObj.left + frameObj.width / 2}
                      top={frameObj.top ? frameObj.top / 2.6 : "auto"}
                      onClickAdd={(e) => handleAddFrame(e)}
                      onClickDelete={(e) => handleDeleteFrame(e)}
                    /> */}
                    {/* <ChangePictureButton
                      marginLeft={frameObj.left - frameObj.width / 2}
                      top={frameObj.top ? frameObj.top / 2 : "auto"}
                      index={frameObj.key}
                      onClick={(e) => handleChangeButton(frameObj)}
                      borderColor={
                        currentFrame == frameObj.key &&
                        currentButton === "ChangePicture"
                          ? "orange"
                          : "black"
                      }
                      transform={
                        frameObj.top
                          ? "translate(-50%, -50%)"
                          : "translate(-50%, 0)"
                      }
                    /> */}
                    {/* <MoveFrameButton
                      marginLeft={frameObj.left}
                      top={frameObj.top ? frameObj.top / 2 : "auto"}
                      index={frameObj.key}
                      onClick={(e) => handleMoveButton(frameObj)}
                      borderColor={
                        currentFrame == frameObj.key && currentButton === "Move"
                          ? "orange"
                          : "black"
                      }
                      transform={
                        frameObj.top
                          ? "translate(-50%, -50%)"
                          : "translate(-50%, 0)"
                      }
                    /> */}
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
      <div>
        {bottomMenu === bottomMenuOptions.FrameInfo ? (
          <div>
            <div style={{ height: 200 }}>Available At:</div>
            <div className="actionButtonContainer">
              <ActionButton
                clicked={false}
                caretLeft={true}
                onClick={() => history.push("/wall-area")}
              >
                Back
              </ActionButton>
              <ActionButton
                clicked={true}
                style={{}}
                onClick={() => downloadDocument()}
              >
                Download&nbsp;
                <img src={download_icon} />
              </ActionButton>
            </div>
          </div>
        ) : (
          <div>
            <div className="changeButtonContainer">
              <ActionButton
                onClick={() => fileInputRef.current.click()}
                style={{ margin: "auto" }}
              >
                Change Image
              </ActionButton>
              <input
                type="file"
                id="input"
                className="upload-button"
                hidden
                onChange={(e) => onImageChange(e)}
                ref={fileInputRef}
              />
            </div>
            <div className="actionButtonContainer">
              <ActionButton onClick={() => handleResetChanges()}>
                Reset
              </ActionButton>
              <ActionButton onClick={() => handleApplyChanges()} style={{}}>
                Apply
              </ActionButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
