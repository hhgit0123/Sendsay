import React from "react";
import VerticalDotes from "assets/VerticalDotes";
export default function DraggableSplitter(props) {
  return (
    <div onMouseDown={props.drag} className="console-draggableSplitter">
      <VerticalDotes />
    </div>
  );
}
