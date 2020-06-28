import React from "react";
import Spinner from "assets/Spinner.js";
import { Link } from "react-router-dom";
export default function LoginBtn(props) {
  switch (props.formState) {
    case "valid":
      return (
        <button className="btn btn--primary" type="submit">
          Войти
        </button>
      );
    case "checkingUserData":
      return (
        <div
          onClick={(e) => e.preventDefault()}
          className="btn btn--primary spinner"
        >
          <Spinner />
        </div>
      );
    default:
      return (
        <button
          onClick={(e) => e.preventDefault()}
          className="btn btn--disabled"
        >
          Войти
        </button>
      );
  }
}
