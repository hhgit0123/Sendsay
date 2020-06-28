import React, { useState, useEffect } from "react";
import DropdownMenu from "./components/DropdownMenu";
import ActionName from "./components/ActionName";
import OnCopyAnimation from "./components/OnCopyAnimation";
import { connect } from "react-redux";
import "./ActionItem.css";
const mapDispatchToProps = (dispatch) => {
  return {
    setRequest: (x) => {
      dispatch({ type: "setRequest", payload: x });
    },
    delAction: (x) => {
      dispatch({ type: "delAction", payload: x });
    },
  };
};
function ActionItem(props) {
  const [menuIsOpened, setMenuIsOpened] = useState(false);
  const [OnCopyAnimationRef, setOnCopyAnimationRef] = useState(null);
  const [menuStyle, setMenuStyle] = useState({ width: "", left: "" });
  function menuHandleClick(e) {
    e.stopPropagation();
    switch (e.target.name) {
      case "copy":
        navigator.clipboard.writeText(props.data.request);
        let copyAnimationPos = e.target.getBoundingClientRect().left; //+margin
        OnCopyAnimationRef.style.left = copyAnimationPos + "px";
        OnCopyAnimationRef.classList.add("actionItem-onCopyAnimation-active");
        break;
      case "send":
        props.setRequest(props.data.request);
        props.submit();
        break;
      case "delete":
        props.delAction(props.data.request);
      default:
        break;
    }
  }
  function openMenu(e) {
    e.nativeEvent.stopImmediatePropagation();
    if (!menuIsOpened) {
      props.setRequest(props.data.request);
      let { width, height, left } = e.currentTarget.getBoundingClientRect();
      setMenuIsOpened(true);
      setMenuStyle({ width, height, left });
    }
  }
  function closeMenu() {
    setMenuIsOpened(false);
  }
  useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);
  return (
    <div onClick={openMenu} className="actionItem">
      <ActionName
        requestTxt={JSON.parse(props.data.request).action}
        isSuccessful={props.data.isSuccessful}
      />
      <DropdownMenu
        menuStyle={menuStyle}
        isOpened={menuIsOpened}
        menuHandleClick={menuHandleClick}
      />
      <OnCopyAnimation setOnCopyAnimationRef={setOnCopyAnimationRef} />
    </div>
  );
}
export default connect(null, mapDispatchToProps)(ActionItem);
