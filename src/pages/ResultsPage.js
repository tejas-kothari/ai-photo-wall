import React, { useState, useRef } from "react";
import "styles.css";
import "./ResultsPage.css";
import FrameWall from "components/FrameWall";
import ActionButton from "components/ActionButton";
import download_icon from "assets/download_icon.svg";
import ikea_logo from "assets/ikea_logo.svg";
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
	const [frameRatio, setFrameRatio] = useState(1);

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

	const getFrameSize = () => {
    // frame sizes [width, height]
    var frameSizes = [[30.5,40.5, "LOMVIKEN", "99.9"], [53,73, "SILVERHÖJDEN", "129.9"], [61.5,91.5, "LOMVIKEN", "249.9"], [32,42, "RIBBA", "99.9"], [42,52, "RIBBA", "119.9"], [21.5,30.5, "LOMVIKEN", "69.9"], [24,33, "FISKBO", "19.9"], [12,20, "FIESTAD", "19.9"], [37,47, "EDSBRUK", "129.9"], [47,57, "EDSBRUK", "169.9"], [21,26, "LERBODA", "59.9"],
                [52,72, "KNOPPÄNG", "119.9"], [64,94, "KNOPPÄNG", "149.9"], [23,32, "HOVSTA", "59.9"], [23,28, "VÄSTANHED", "59.9"], [40.5,50.5, "LOMVIKEN", "129.9"], [43,53, "SILVERHÖJDEN", "99.9"], [12,26, "GALLBODA", "39"], [15,20, "HOVSTA", "29.9"], [57,77, "RAMSBORG", "249.9"], [50.5,70.5, "LOMVIKEN", "199.9"], [23.5,32.5, "RIBBA", "59.9"], [15,20, "HOVSTA", "29.9"],
                [25,52, "RIBBA", "99.9"], [20,25, "EDSBRUK", "49.9"], [37,37, "SANNAHED", "99.9"], [16.5,16.5, "LERBODA", "49.9"], [25,25, "HOVSTA", "69.9"], [13,18, "FISKBO", "9.9"], [33,43, "VÄSTANHED", "99.9"], [28,37, "EDSBRUK", "79.9"], [68,98, "EDSBRUK", "199"], [27,27, "SANNAHED", "69.9"], [24,33, "FISKBO", "19.9"], [47.5, 58, "RAMSBORG", "149.9"], [32.5,32.5, "LOMVIKEN", "89.9"],
                [21,26, "LERBODA", "59.9"], [33,43, "VÄSTANHED", "99.9"], [12,17, "RIBBA", "29.9"], [16,21, "FISKBO", "12.9"]];
    var smallestDist = Number.POSITIVE_INFINITY
    var currentFrame = frameSizes[0]
		var height = frameAreaWidth * frameRatio;
		var width = frameAreaWidth;
    console.log(frameSizes.length)

    for(var i=0; i<frameSizes.length; i++){
      if (height >= width){      //portrait
        var heightDiff = Math.abs(height - frameSizes[i][1]);
        var widthDiff = Math.abs(width - frameSizes[i][0]);
        var distance = heightDiff + widthDiff;
      } else if (height < width) {    //landscape
        var heightDiff = Math.abs(height - frameSizes[i][0]);
        var widthDiff = Math.abs(width - frameSizes[i][1]);
        var distance = heightDiff + widthDiff;
      }

      if ( distance < smallestDist ){
        if(height == width){
          if ( heightDiff == widthDiff){
            smallestDist = distance
            currentFrame = frameSizes[i]
          }
        }
        else{
          smallestDist = distance
          currentFrame = frameSizes[i]
        }
      }
    }

    if (height >= width){      //portrait
      var returnValue = currentFrame[1] + "×" + currentFrame[0]
    } else if (height < width) {    //landscape
      var returnValue = currentFrame[0] + "×" + currentFrame[1]
    }

    return [returnValue, currentFrame[2], currentFrame[3]] ;

  }

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
				wallSize={wallSize}
				setFrameRatio={setFrameRatio}
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
          <div>
						<h3>Available At:</h3>
						<img src={ikea_logo}/>
						<div style={{display:"flex"}}>
							<div>
								<h3 className="infoTitle">Frame Name:</h3>
								<h3 className="infoTitle">Sizing:</h3>
								<h3 className="infoTitle">Price:</h3>
								<h3 className="infoTitle">Link To Buy:</h3>
							</div>
							<div>
								<h3 className="infoContent">{getFrameSize()[1]}</h3>
								<h3 className="infoContent">{getFrameSize()[0]}</h3>
								<h3 className="infoContent">${getFrameSize()[2]}</h3>
								<a className="infoContent" href="https://www.ikea.com.hk">www.ikea.com.hk</a>
							</div>
						</div>
					</div>
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
