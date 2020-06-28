import React from "react";
import { connect } from "react-redux";
import Footer from "./Footer";
const mapStateToProps = (state) => {
  return {
    isFetching: state.console.isFetching,
    request: state.console.request,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setRequest: (x) => {
      dispatch({ type: "setRequest", payload: x });
    },
  };
};
function FooterContainer(props) {
  function formatRequest() {
    props.setRequest(
      JSON.stringify(JSON.parse(props.request), undefined, "\t")
    );
  }
  return (
    <Footer
      submit={props.submit}
      isFetching={props.isFetching}
      formatRequest={formatRequest}
    />
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(FooterContainer);
