import React from "react";
import "./_ScrollDownAnimation.scss";
import { RxDoubleArrowDown } from "react-icons/rx";
import { RxDoubleArrowUp } from "react-icons/rx";

function ScrollDownAnimation({ showDropdown }) {
  return (
    <div className="scroll-down-animation-wrapper">
      <p className="label">Add more info:</p>
      <div className={`arrow bounce`}>
        {!showDropdown ? <RxDoubleArrowDown /> : <RxDoubleArrowUp />}
      </div>
      <span className="unfold-text">
        Click to {!showDropdown ? "unfold" : "hide"}
      </span>
    </div>
  );
}

export default ScrollDownAnimation;
