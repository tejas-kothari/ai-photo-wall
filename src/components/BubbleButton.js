import "./BubbleButton.css";
import "styles.css";

export default function BubbleButton(props) {
  return (
    <span
      onClick={props.onClick}
      className={
        "BubbleButton " +
        (props.clicked ? "clicked" : "not-clicked") +
        " " +
        props.className
      }
      style={props.style}
    >
      {props.children}
    </span>
  );
}
