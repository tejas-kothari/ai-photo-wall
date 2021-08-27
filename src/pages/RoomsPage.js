import { useState } from "react";
import "styles.css";
import "./RoomsPage.css";
import BubbleButton from "components/BubbleButton";
import room1Img from "assets/rooms/1.png";
import room2Img from "assets/rooms/2.png";
import room3Img from "assets/rooms/3.png";
import { useHistory } from "react-router-dom";

export default function RoomsPage() {
  let history = useHistory();
  const [activatedBtn, setActivatedBtn] = useState(0);

  return (
    <div className="RoomsPage">
      <h1 className="PageTitle">For you</h1>
      <div className="BubbleContainer">
        {["Living Room", "Bedroom", "Dining Room"].map((room, index) => (
          <BubbleButton
            clicked={activatedBtn === index}
            onClick={() => setActivatedBtn(index)}
            className="roomBubble"
          >
            {room}
          </BubbleButton>
        ))}
      </div>
      <div className="imgList">
        {[room1Img, room2Img, room3Img].map((roomImg) => (
          <img
            className="roomImg"
            src={roomImg}
            onClick={() => history.push("/wall-area")}
          />
        ))}
      </div>
    </div>
  );
}
