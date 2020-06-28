import React, { useEffect } from "react";

export default function OnCopyAnimation(props) {
  const ref = React.useRef();
  function hide() {
    ref.current.classList.remove("actionItem-onCopyAnimation-active");
  }
  useEffect(() => {
    props.setOnCopyAnimationRef(ref.current);
    ref.current.addEventListener("animationend", hide);
  }, []);
  return (
    <div ref={ref} className={"actionItem-onCopyAnimation"}>
      Скопировано
    </div>
  );
}
