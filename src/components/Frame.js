import "styles.css";
import "./Frame.css";

export default function Frame(props) {
  return (
    <div className={"Frame " + props.className} style={props.style}>
      <img src={props.img} />
    </div>
  );
}
