import React from "react";
import HeaderContainer from "./header/HeaderContainer";
import ActionsHistoryContainer from "./actionsHistory/ActionsHistoryContainer";
import Console from "./console/Console";
import FooterContainer from "./footer/FooterContainer";
import Sendsay from "sendsay-api";
import { connect } from "react-redux";
import "./MainPage.css";
const mapStateToProps = (state) => {
  return {
    isFetching: state.console.isFetching,
    request: state.console.request,
    session: state.auth.session,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setResponse: (x) => {
      dispatch({ type: "setResponse", payload: x });
    },
    saveAction: (x) => {
      dispatch({ type: "saveAction", payload: x });
    },
    setErrors: (x) => {
      dispatch({ type: "setErrors", payload: x });
    },
    setIsFetching: (x) => {
      dispatch({ type: "setIsFetching", payload: x });
    },
  };
};
function MainPage(props) {
  function handleSubmit() {
    if (props.isFetching) return;
    if (validateRequest()) {
      send();
      return;
    } else {
      props.setErrors({ inRequest: true, inResponse: false });
    }
  }
  function validateRequest() {
    try {
      JSON.parse(props.request);
      if (!isNaN(parseInt(props.request))) {
        throw new Error("Только число");
      }
    } catch (e) {
      return false;
    }
    return true;
  }
  function send() {
    props.setIsFetching(true);
    const sendsay = new Sendsay();
    sendsay.setSession(props.session);
    sendsay
      .request(JSON.parse(props.request))
      .then((response) => {
        props.saveAction({ request: props.request, isSuccessful: true });
        props.setResponse(JSON.stringify(response, undefined, "\t"));
      })
      .catch((error) => {
        props.saveAction({ request: props.request, isSuccessful: false });
        props.setResponse(JSON.stringify(error, undefined, "\t"));
        props.setErrors({ inRequest: false, inResponse: true });
      })
      .finally(() => props.setIsFetching(false));
  }
  return (
    <div className="mainPage">
      <HeaderContainer />
      <ActionsHistoryContainer submit={handleSubmit} />
      <Console />
      <FooterContainer submit={handleSubmit} />
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
