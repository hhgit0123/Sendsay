import React from "react";
import SmileIcon from "assets/SmileIcon";
import "./AuthError.css";
export default function AuthError(props) {
  let style;
  props.isVisible
    ? (style = { display: "flex" })
    : (style = { display: "none" });
  return (
    <div style={style} className="authError">
      <div className="authError-smile">
        <SmileIcon />
      </div>
      <div className="authError-header">
        <p>Вход не вышел</p>
        <span className="authError-errorTxt">{props.errorTxt} </span>
      </div>
    </div>
  );
}
