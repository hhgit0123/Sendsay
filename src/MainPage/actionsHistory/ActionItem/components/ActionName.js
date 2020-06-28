import React from "react";
import VerticalDotes from "assets/VerticalDotes";
export default function ActionName(props) {
  let color;
  props.isSuccessful ? (color = "#30B800") : (color = "#CF2C00");
  return (
    <div className="actionItem-actionName">
      <div
        className="actionItem-successIcon"
        style={{ backgroundColor: color }}
      ></div>
      <div>
        <span className="actionItem-requestTxt">{props.requestTxt}</span>
      </div>
      <VerticalDotes />
    </div>
  );
}
