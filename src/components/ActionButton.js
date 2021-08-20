import "./ActionButton.css";
import "styles.css";

export default function ActionButton(props) {
  return (
    <div
      onClick={props.onClick}
      className={
        "ActionButton " +
        (props.clicked ? "AB_clicked" : "AB_not-clicked") +
        " " +
        props.className
      }
      style={props.style}
    >
      {props.caretLeft ? <span className="caretLeft"></span> : null}
      {props.children}
    </div>
  );
}
