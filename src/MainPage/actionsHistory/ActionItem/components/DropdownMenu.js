import React from "react";
export default function DropdownMenu(props) {
  let style = {};
  props.isOpened ? (style.display = "flex") : (style.display = "none");
  if (props.isOpened) {
    style.width = props.menuStyle.width;
    style.left = props.menuStyle.left;
    style.top = "95px";
  }
  return (
    <div
      className="actionItem-menu"
      onClick={props.menuHandleClick}
      style={style}
    >
      <a name="send">Выполнить</a>
      <a name="copy">Скопировать</a>
      <hr />
      <a name="delete">Удалить</a>
    </div>
  );
}
