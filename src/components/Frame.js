import "./Frame.css";
import "styles.css";
import upload_img from "assets/upload_img.svg";
import FrameCircleButton from "components/FrameCircleButton.js";
import { ReactComponent as ChangeIcon } from "assets/change_icon.svg";
import { ReactComponent as MoveIcon } from "assets/move_icon.svg";
import { ReactComponent as EditIcon } from "assets/add_delete.svg";

export default function Frame(props) {
  return (
    <div className={"Frame " + props.className} style={props.style}>
      <div className="imgContainer">
        <img className="photoImg" src={props.img ? props.img : upload_img} />
        {props.showButtons && (
          <FrameCircleButton
            frameIndex={props.frameIndex}
            buttonIndex={0}
            className="fcb-position-size change-img-fcb"
          >
            <ChangeIcon />
          </FrameCircleButton>
        )}
      </div>
      {props.showButtons && (
        <>
          <FrameCircleButton
            frameIndex={props.frameIndex}
            buttonIndex={1}
            className="fcb-position-size move-img-fcb"
          >
            <MoveIcon />
          </FrameCircleButton>
          <FrameCircleButton
            frameIndex={props.frameIndex}
            buttonIndex={2}
            className="fcb-position-size edit-img-fcb"
          >
            <EditIcon />
          </FrameCircleButton>
        </>
      )}
    </div>
  );
}
