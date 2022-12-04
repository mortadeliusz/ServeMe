import { createPortal } from "react-dom";
import classes from "./popup.module.css";

export default function PopUp(props) {
  const popUpElement = (
    <div className={classes.backdrop} onClick={props.onBackDropClick}>
      <div className={classes.content} onClick={(e) => e.stopPropagation()}>
        <div className={classes["close-me"]} onClick={props.onClose}>
          <span className="material-icons">close</span>
        </div>
        {props.children}
      </div>
    </div>
  );
  return createPortal(popUpElement, document.getElementById("popUpContainer"));
}
