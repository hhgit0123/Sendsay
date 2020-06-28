import React, { useEffect, useState } from "react";
import MainPage from "./MainPage/MainPage";
import LoginPage from "./LoginPage/LoginPage";
import Sendsay from "sendsay-api";
import { connect } from "react-redux";
import "./App.css";
import "./buttons.css";
import { Route, Redirect, Switch } from "react-router-dom";
const mapDispatchToProps = (dispatch) => {
  return {
    setSession: (x) => dispatch({ type: "setSession", payload: x }),
    setIsAuthenticated: (x) =>
      dispatch({ type: "setIsAuthenticated", payload: x }),
  };
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};
function App(props) {
  const [isAuthCheked, setIsAuthChecked] = useState(false);
  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      const sendsay = new Sendsay();
      sendsay.setSession(session);
      sendsay
        .request({
          action: "pong",
        })
        .then(() => {
          props.setIsAuthenticated(true);
          props.setSession(session);
        })
        .catch((e) => {
          props.setIsAuthenticated(false);
          localStorage.removeItem("session");
        })
        .finally(() => setIsAuthChecked(true));
    } else {
      setIsAuthChecked(true);
    }
  }, []);
  let avaliableRoute, redirect;
  if (isAuthCheked) {
    if (props.isAuthenticated) {
      avaliableRoute = <Route path="/main" component={MainPage} />;
      redirect = <Redirect from="/" to="/main" />;
    } else {
      avaliableRoute = <Route path="/login" component={LoginPage} />;
      redirect = <Redirect from="/" to="/login" />;
    }
  }
  return (
    <div className="App">
      <Switch>
        {avaliableRoute}
        {redirect}
      </Switch>
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
