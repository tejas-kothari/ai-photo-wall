import React, { useState, useEffect, useRef } from "react";
import "styles.css";
import "./ResultsPage.css";
import Frame from "components/Frame";
import FrameButton from "components/FrameButton";
import ActionButton from "components/ActionButton";
import MoveFrameButton from "components/MoveFrameButton";
import ChangePictureButton from "components/ChangePictureButton"
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Draggable from "react-draggable";

export default function ResultsPage() {
  const location = useLocation();
  let history = useHistory();

	const bottomMenuOptions = {
		FrameInfo : "Frame Info",
		ChangeImage: "Change Image"
	}

  const [frameArray1, setframeArray1] = useState(location.state.layout);
	const [bottomMenu, setBottomMenu] = useState(bottomMenuOptions.FrameInfo);
	const [currentFrame, setCurrentFrame] = useState(null);
	const [image, setImage] = useState(null);
	const fileInputRef = useRef();

	useEffect(() => {
		let frameArray = [...frameArray1]
		for(var i = 0; i<frameArray.length; i++){
			frameArray[i].key = i;
		};
		console.log(frameArray);
		setframeArray1(frameArray);
	}, []);


  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
    	let img = event.target.files[0];
			console.log(img)
			let frameArray = [...frameArray1];
			frameArray[currentFrame].image = URL.createObjectURL(img);
			setframeArray1(frameArray);
			console.log(frameArray1);
    }
  };
	
  const handleAddFrame = (e) => {
		let frameArray = [...frameArray1]
		let key = e.target.id;
		console.log(key)
		console.log(frameArray)
		console.log(frameArray[frameArray.length-1])
    let temp = {...frameArray[key]};
		temp.key = frameArray[frameArray.length-1].key + 1;
		console.log(temp)
		setframeArray1([...frameArray1, temp]);
		console.log(frameArray);
		console.log(frameArray1)
  };

  const handleDeleteFrame = (e) => {
    let frameArray = [...frameArray1];
		console.log(frameArray)
		console.log(e.target.id)
		let key = frameArray.findIndex(obj => obj.key == e.target.id);
		console.log(key)
		if(key !== -1){
			frameArray.splice(key, 1);
		}
		setframeArray1(frameArray);
		console.log(frameArray1)
  };

	const handleChangeBottomMenu = (value, image) => {
		setBottomMenu(bottomMenuOptions.ChangeImage);
		setCurrentFrame(value.target.id);
		console.log(image)
		setImage(image);
	}

	const handleResetChanges = () => {
		let frameArray = [...frameArray1];
		frameArray[currentFrame].image = image;
		setframeArray1(frameArray);
		setBottomMenu(bottomMenuOptions.FrameInfo);
	}

	const handleApplyChanges = () => {
		setBottomMenu(bottomMenuOptions.FrameInfo);
	}
	
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
          <div className="framesContainer">
            {frameArray1.map((frameObj, index) => (
							<div key={frameObj.key}>
              <Draggable
								disabled={
									currentFrame == frameObj.key
									? false
									: true
								}
							>
                <div
                  style={{
                    top: frameObj.top ? frameObj.top : "auto",
                  }}
                >
                  <FrameButton
                    index={frameObj.key}
                    marginLeft={frameObj.left + frameObj.width / 2}
                    top={frameObj.top ? frameObj.top : "auto"}
                    onClickAdd={(e) => handleAddFrame(e)}
                    onClickDelete={(e) => handleDeleteFrame(e)}
                  />
									{/* <input type="file" id="input" className="upload-button"/> */}
									<ChangePictureButton
										marginLeft={frameObj.left - frameObj.width / 2}
										top={frameObj.top ? frameObj.top : "auto"}
										index = {frameObj.key}
										onClick = {(e) => handleChangeBottomMenu(e, frameObj.image)}
										backgroundColor={
											currentFrame == frameObj.key
											? "orange"
											: "white"
										}
									/>
									<MoveFrameButton
										marginLeft={frameObj.left/1.06}
										top={frameObj.top ? frameObj.top : "auto"}
										index = {frameObj.key}
										onClick = {(e) => setCurrentFrame(frameObj.key)}
										backgroundColor={
											currentFrame == frameObj.key
											? "orange"
											: "white"
										}
									/>
                  <Frame
										img = {frameObj.image}
                    identifier={"frame-" + frameObj.key}
                    className="framePos"
                    lineHeight={
                      location.state.frameAreaWidth *
                      frameObj.width *
                      frameObj.ratio
                    }
                    style={{
                      width: frameObj.width * 100 + "%",
                      height:
                        location.state.frameAreaWidth *
                        frameObj.width *
                        frameObj.ratio,
                      left: frameObj.left ? frameObj.left * 100 + "%" : "auto",
                      top: frameObj.top ? frameObj.top : "auto",
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
				{
					bottomMenu === bottomMenuOptions.FrameInfo 
						?	<div>
								<div style={{height:200}}>
									Available At:
								</div>
								<ActionButton
									clicked={false}
									caretLeft={true}
									onClick={() => history.push("/wall-area")}
								>
									Back
								</ActionButton>
							</div>
							 
						:	<div>
								<div className="changeButtonContainer">
									<ActionButton onClick={()=>fileInputRef.current.click()} style={{margin:"auto"}}>
										Change Image
									</ActionButton>
									<input type="file" id="input" className="upload-button" hidden onChange={(e) => onImageChange(e)} ref={fileInputRef}/>
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
				}
			</div>
    </div>
  );
}
