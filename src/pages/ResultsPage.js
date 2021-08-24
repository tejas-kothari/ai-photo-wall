import React, { useState } from "react";
import "styles.css";
import "./ResultsPage.css";
import Frame from "components/Frame";
import FrameButton from "components/FrameButton";
import ActionButton from "components/ActionButton";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Draggable from 'react-draggable';

export default function ResultsPage(){
	const location = useLocation();
	let history = useHistory();

	const [frameArray1, setframeArray1] = useState(location.state.layout);

	const handleAddFrame = (e) => {
		let frameArray = [...frameArray1]
		var key = e.target.id
		var temp = frameArray[key]
		console.log(key)
		console.log(temp)
		frameArray.push(temp)
		console.log(frameArray)
		setframeArray1(frameArray);
	}

	const handleDeleteFrame = (e) => {
		let frameArray = [...frameArray1]
		console.log('ss')
		var key = e.target.id
		console.log("key: "+key)
		if (key !== -1) {
			console.log(key)
			frameArray.splice(key, 1);
			setframeArray1(frameArray);
		}
		console.log(frameArray)
	}


  return(
		<div className="ResultsPage">
			<h1 className="PageTitle">Your AI Wall</h1>
			<div className="infoContainer">
				<div style={{width:80}}>
					<h3 className="infoTitle"> Wall Size </h3>
					<h3 className="infoContent"> {location.state.sizeVal} </h3>
				</div>
				<div style={{width:80}}>
					<h3 className="infoTitle"> Scale </h3>
					<h3 className="infoContent"> {location.state.scale} </h3>
				</div>
			</div>
			<div 
				className="frameRoomContainer" 
			>
				<img src={location.state.wallImage} className="roomImg" />
				<div
					className="frameArea"
					style={{ width: location.state.areaWidth + "%" }}
				>
					<div className="framesContainer">
						{frameArray1.map((frameObj, index) => (
							<Draggable>
								<div 
								key={index}
								style={{
									top : frameObj.top ? frameObj.top : "auto",
								}}>
									<FrameButton 
										id={index} 
										marginLeft={frameObj.left + frameObj.width/2}  
										top={frameObj.top ? frameObj.top : "auto"} 
										onClickAdd={(e) => handleAddFrame(e)} 
										onClickDelete={(e) => handleDeleteFrame(e)}/>
									<Frame
										identifier={"frame-"+index}
										className="framePos"
										lineHeight={location.state.frameAreaWidth * frameObj.width * frameObj.ratio}
										style={{
											width: frameObj.width * 100 + "%",
											height:
												location.state.frameAreaWidth * frameObj.width * frameObj.ratio,
											left: frameObj.left
												? frameObj.left * 100 + "%"
												: "auto",
											top: frameObj.top ? frameObj.top : "auto",
										}}
									/>
								</div>
							</Draggable>
						))}
					</div>
				</div>
			</div>
			<ActionButton
        clicked={false}
        caretLeft={true}
        onClick={() => history.push("/wall-area")}
      >
        Back
      </ActionButton>
		</div>
  )
}