import { useState } from "react";
import "styles.css";
import "./RoomsPage.css";
import BubbleButton from "components/BubbleButton";
import room1Img from "assets/rooms/1.png";
import room2Img from "assets/rooms/2.png";
import room3Img from "assets/rooms/3.png";
import { ReactComponent as PlusIcon } from "assets/001-add.svg";
import { useHistory } from "react-router-dom";
import { useRef } from "react";

export default function RoomsPage() {
  let history = useHistory();
  const [activatedBtn, setActivatedBtn] = useState(0);
  const fileInputRef = useRef();
  const [roomImgs, setRoomImgs] = useState([room1Img, room2Img, room3Img]);

  const onImageAdd = (event) => {
    if (event.target.files && event.target.files[0]) {
      setRoomImgs((oldImgs) => [
        URL.createObjectURL(event.target.files[0]),
        ...oldImgs,
      ]);
    }
  };

  return (
    <div className="RoomsPage standardPagePadding">
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
        {roomImgs.map((roomImg) => (
          <img
            className="roomImg"
            src={roomImg}
            onClick={() => history.push("/wall-area")}
          />
        ))}
      </div>
      <div className="addRoomImg" onClick={() => fileInputRef.current.click()}>
        <PlusIcon className="plusIcon" />
        <input type="file" hidden ref={fileInputRef} onChange={onImageAdd} />
      </div>
    </div>
  );
}
