import React from "react";

export default function JsonEditor(props) {
  let className = `console-jsonEditor ${
    props.isError ? "console-jsonEditor-isError" : "console-jsonEditor-normal"
  }`;
  return (
    <div style={{ width: props.width }} className={className}>
      <span>{props.title}:</span>
      <textarea
        readOnly={props.readonly}
        onChange={props.handleChange}
        value={props.value}
      ></textarea>
    </div>
  );
}
