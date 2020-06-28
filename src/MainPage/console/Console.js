import React, { useState, useEffect } from "react";
import DraggableSplitter from "./DraggableSplitter";
import JsonEditor from "./JsonEditor";
import "./Console.css";
import { connect } from "react-redux";
const mapStateToProps = (state) => {
  return {
    errors: state.console.errors,
    request: state.console.request,
    response: state.console.response,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setRequest: (x) => {
      dispatch({ type: "setRequest", payload: x });
    },
    setErrors: (x) => {
      dispatch({ type: "setErrors", payload: x });
    },
  };
};
function Console(props) {
  function handleChange(e) {
    props.setRequest(e.target.value);
    if (props.errors.inRequest || props.errors.inResponse) {
      props.setErrors({ inRequest: false, inResponse: false });
    }
  }
  const [width, setWidth] = useState({
    responseField: "100%",
    requestField: "100%",
  });
  function onMouseMove(event) {
    moveAt(event.pageX);
  }
  function moveAt(pageX) {
    let requestFieldWidth = pageX + "px";
    let responseFieldWidth = document.body.clientWidth - pageX + "px";
    setWidth({
      responseField: responseFieldWidth,
      requestField: requestFieldWidth,
    });
  }
  function drag() {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener(
      "mouseup",
      function (e) {
        localStorage.setItem("width", Number(e.pageX));
        document.removeEventListener("mousemove", onMouseMove);
      },
      { once: true }
    );
  }
  useEffect(() => {
    let width = localStorage.getItem("width");
    if (width) {
      moveAt(width);
    }
  }, []);
  return (
    <div className="console">
      <JsonEditor
        value={props.request}
        title={"Запрос"}
        readonly={false}
        width={width.requestField}
        isError={props.errors.inRequest}
        handleChange={handleChange}
      />
      <DraggableSplitter drag={drag} />
      <JsonEditor
        title={"Ответ"}
        value={props.response}
        readonly={true}
        width={width.responseField}
        isError={props.errors.inResponse}
      />
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Console);
