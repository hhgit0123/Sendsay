import React, { useState, useEffect } from "react";
import LogoIcon from "assets/LogoIcon";
import LoginForm from "./LoginForm/loginForm/LoginForm";
import AuthError from "./LoginForm/authError/AuthError";
import Sendsay from "sendsay-api";
import { connect } from "react-redux";
import "./LoginPage.css";
const mapDispatchToProps = (dispatch) => {
  return {
    success: (x) => {
      localStorage.setItem("session", x);
      dispatch({
        type: "setIsAuthenticated",
        payload: true,
      });
      dispatch({ type: "setSession", payload: x });
    },
  };
};
function LoginPage(props) {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [login, setLogin] = useState("");
  const [sublogin, setSublogin] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState({
    isVisible: false,
    errorTxt: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    login: false,
    sublogin: false,
    password: false,
  });
  const [formState, setFormState] = useState("invalid");
  function handleChange(e) {
    //чтобы не подкрашывались поля во время первого рендера
    if (isFirstRender) {
      setIsFirstRender(false);
    }
    switch (e.target.name) {
      case "login":
        setLogin(e.target.value);
        break;
      case "sublogin":
        setSublogin(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
    setAuthError({ isVisible: false, txt: "" });
  }
  function validateForm() {
    //чтобы не подкрашывались поля во время первого рендера
    if (isFirstRender) return false;
    let loginValidation, passwordValidation, errors;
    errors = { login, sublogin, password };
    loginValidation = new RegExp("^[a-zA-Z0-9/@//./]+$");
    passwordValidation = new RegExp("^[a-zA-Z0-9 ]+$");
    loginValidation.test(login)
      ? (errors.login = false)
      : (errors.login = true);
    passwordValidation.test(password)
      ? (errors.password = false)
      : (errors.password = true);
    if (sublogin.length !== 0) {
      loginValidation.test(sublogin)
        ? (errors.sublogin = false)
        : (errors.sublogin = true);
    } else {
      errors.sublogin = false;
    }
    setValidationErrors(errors);
    if (Object.values(errors).indexOf(true) === -1) {
      return true;
    } else {
      return false;
    }
  }
  function handleSubmit(e) {
    setFormState("checkingUserData");
    e.preventDefault();
    let userData;
    const sendsay = new Sendsay();
    if (sublogin) {
      userData = { login, sublogin, password };
    } else {
      userData = { login, password };
    }
    sendsay
      .login(userData)
      .then(() => props.success(sendsay.session))
      .catch((e) => {
        setAuthError({
          isVisible: true,
          txt: JSON.stringify({ id: e.id, explain: e.explain }),
        });
        setFormState("invalid");
      });
  }
  useEffect(() => {
    if (validateForm()) {
      setFormState("valid");
    } else {
      setFormState("invalid");
    }
  }, [login, sublogin, password]);
  return (
    <div className="loginPage">
      <LogoIcon />
      <div className="loginPage-main">
        <div className="loginPage-title">
          <p>API-консолька</p>
        </div>
        <AuthError isVisible={authError.isVisible} errorTxt={authError.txt} />
        <LoginForm
          formState={formState}
          login={login}
          sublogin={sublogin}
          password={password}
          validationErrors={validationErrors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
      <button className="gitLink">@link to git</button>
    </div>
  );
}
export default connect(null, mapDispatchToProps)(LoginPage);
