import React from "react";
import "./LoginForm.css";
import LoginBtn from "./LoginBtn";
export default function LoginForm(props) {
  let loginRowClass, subloginRowClass, passwordRowClass;
  let { login, sublogin, password, validationErrors, handleChange } = props;
  loginRowClass = `loginForm-row ${
    validationErrors.login ? "loginForm-row-error" : "loginForm-row-normal"
  }`;
  subloginRowClass = `loginForm-row loginForm-row-optional ${
    validationErrors.sublogin ? "loginForm-row-error" : "loginForm-row-normal"
  }`;
  passwordRowClass = `loginForm-row ${
    validationErrors.password ? "loginForm-row-error" : "loginForm-row-normal"
  }`;
  return (
    <div>
      <form onSubmit={props.handleSubmit} className="loginForm">
        <div className={loginRowClass}>
          <label htmlFor="login">Логин</label>
          <input
            noValidate
            value={login}
            type="text"
            name="login"
            onChange={handleChange}
          />
        </div>
        <div className={subloginRowClass}>
          <label htmlFor="sublogin">Сублогин</label>
          <input
            noValidate
            value={sublogin}
            type="text"
            name="sublogin"
            onChange={handleChange}
          />
          <span>Опционально</span>
        </div>
        <div className={passwordRowClass}>
          <label htmlFor="password">Пароль</label>
          <input
            noValidate
            value={password}
            type="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <LoginBtn formState={props.formState} />
      </form>
    </div>
  );
}
