import React from "react";
import FormatRequestIcon from "assets/FormatRequestIcon.js";
import Spinner from "assets/Spinner";
import "./Footer.css";
export default function Footer(props) {
  let btnContent;
  props.isFetching
    ? (btnContent = (
        <div className="spinner">
          <Spinner />
        </div>
      ))
    : (btnContent = "Отправить");
  return (
    <footer className="footer">
      <button onClick={props.submit} className="btn btn--primary">
        {btnContent}
      </button>
      <button className="gitLink">@link-to-your-github</button>
      <button className="footer-formatRequestBtn" onClick={props.formatRequest}>
        <FormatRequestIcon />
        <span>Форматировать</span>
      </button>
    </footer>
  );
}
