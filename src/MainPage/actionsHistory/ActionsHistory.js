import React from "react";
import ActionItem from "./ActionItem/ActionItem";
import ClearIcon from "assets/ClearIcon";
export default function ActionsHistoryContainer(props) {
  return (
    <div onWheel={props.scroll} className="actionsHistory">
      {props.actionsHistory.map((data) => (
        <ActionItem
          setRequest={props.setRequest}
          submit={props.submit}
          key={data.request}
          data={data}
        />
      ))}
      <div className="actionsHistory-clearBtnGradient"></div>
      <div className="actionsHistory-clearBtn" onClick={props.clearHistory}>
        <ClearIcon />
      </div>
    </div>
  );
}
