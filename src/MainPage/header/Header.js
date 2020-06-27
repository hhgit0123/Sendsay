import React from "react";
import LogoIcon from "assets/LogoIcon";
import LogoutIcon from "assets/LogoutIcon";
import OpenFullsreenIcon from "assets/OpenFullsreenIcon";
import ExitFullscreenIcon from "assets/ExitFullscreenIcon";
import "./Header.css";
export default function Header(props) {
  let Icon;
  if (props.isFullscreen) {
    Icon = <ExitFullscreenIcon />;
  } else {
    Icon = <OpenFullsreenIcon />;
  }
  return (
    <header className="header">
      <div>
        <LogoIcon />
        <p>API-консолька</p>
      </div>
      <div>
        <div className="header-accountName">
          <span>{`${props.authData.account} : ${props.authData.sublogin}`}</span>
        </div>
        <div onClick={props.logout}>
          <span>Выйти</span>
          <LogoutIcon />
        </div>
        <button
          className="header-fullScreenIcon"
          onClick={props.openInFullScreen}
        >
          {Icon}
        </button>
      </div>
    </header>
  );
}
