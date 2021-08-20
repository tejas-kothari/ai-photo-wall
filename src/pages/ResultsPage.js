import React, { useState } from "react";
import "styles.css";
import "./ResultsPage.css";
import room1Img from "assets/rooms/1.png";
import Frame from "components/Frame";
import FrameButton from "components/FrameButton";

export default function ResultsPage(){
	const [frameArray1, setframeArray1] = useState(["frame-1"]);

	const handleAddFrame = () => {
		let frameArray = [...frameArray1]
		var key = frameArray.length + 1
		frameArray.push("frame-" + key.toString())
		console.log(frameArray)
		setframeArray1(frameArray);
	}

  return(
		<div>
			<div className="title">
				<p style={{fontSize:30}}>Your AI Wall</p>
			</div>
      <div className="background-cointainer">
        <div className="frames-container-outer" style={{height:700, width:800}}>
          {frameArray1.map((frame) => (
						<div className="frames-container-inner" key={frame} style={{height:150, width:100}}>
							<FrameButton marginLeft={100} onClickAdd={() => handleAddFrame()}/>
							<Frame identifier={"frame-1"}/>
						</div>
        	))}
        </div>
        <img className="background-image" src={room1Img} style={{height:"100%"}}/>
      </div>
		</div>
  )
}