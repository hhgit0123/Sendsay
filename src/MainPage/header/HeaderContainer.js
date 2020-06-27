import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Sendsay from "sendsay-api";
import Header from "./Header";
const mapStateToProps = (state) => {
  return {
    session: state.auth.session,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    toLoginPage: () => {
      dispatch({ type: "setIsAuthenticated", payload: false });
    },
    clearSession: () => dispatch({ type: "setSession", payload: null }),
  };
};
function HeaderContainer(props) {
  const [authData, setAuthData] = useState({
    account: "account",
    sublogin: "sublogin",
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  function logout() {
    const sendsay = new Sendsay();
    sendsay.setSession(props.session);
    sendsay.request({
      action: "logout",
    });
    localStorage.removeItem("session");
    props.toLoginPage();
    props.clearSession();
  }
  function openInFullScreen() {
    if (!isFullscreen) {
      document.body.requestFullscreen();
      setIsFullscreen(true);
    } else {
      setIsFullscreen(false);
      document.exitFullscreen();
    }
  }
  useEffect(() => {
    if (props.session) {
      const sendsay = new Sendsay();
      sendsay.setSession(props.session);
      sendsay.request({ action: "pong" }).then((response) => {
        let newAuthData = { account: "account", sublogin: "sublogin" };
        //если авторизация была без саблогина sublogin = account
        response.account === response.sublogin
          ? (newAuthData.account = response.account)
          : (newAuthData = {
              account: response.account,
              sublogin: response.sublogin,
            });
        setAuthData(newAuthData);
      });
    }
  }, [props.session]);
  useEffect(() => {
    document.onfullscreenchange = function () {
      if (document.fullscreen !== isFullscreen) {
        setIsFullscreen(document.fullscreen);
      }
    };
  });
  return (
    <Header
      isFullscreen={isFullscreen}
      authData={authData}
      logout={logout}
      openInFullScreen={openInFullScreen}
    />
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
