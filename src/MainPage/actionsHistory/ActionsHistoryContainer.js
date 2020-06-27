import React, { useEffect } from "react";
import { connect } from "react-redux";
import ActionsHistory from "./ActionsHistory";
import "./ActionsHistory.css";
const mapStateToProps = (state) => {
  return {
    actionsHistory: state.history.actionsHistory,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setRequest: (x) => {
      dispatch({ type: "setRequest", payload: x });
    },
    recoverHistory: (x) => {
      dispatch({
        type: "recoverHistory",
        payload: x,
      });
    },
    clearHistory: () => {
      dispatch({ type: "clearHistory" });
    },
  };
};
function ActionsHistoryContainer(props) {
  function scroll(e) {
    let scrolled = e.deltaY || e.detail || e.wheelDelta;
    let container = e.currentTarget;
    container.scrollLeft += scrolled;
  }
  useEffect(() => {
    window.onbeforeunload = () =>
      localStorage.setItem(
        "actionsHistory",
        JSON.stringify(props.actionsHistory)
      );
  }, [props.actionsHistory]);
  useEffect(() => {
    let actionsHistory = localStorage.getItem("actionsHistory");
    if (actionsHistory) {
      props.recoverHistory(JSON.parse(actionsHistory));
    }
  }, []);
  return (
    <ActionsHistory
      actionsHistory={props.actionsHistory}
      setRequest={props.setRequest}
      clearHistory={props.clearHistory}
      submit={props.submit}
      scroll={scroll}
    />
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionsHistoryContainer);
