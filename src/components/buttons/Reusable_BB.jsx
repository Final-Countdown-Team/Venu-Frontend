import React from "react";
import "./_Reusable_BB.scss";

function ReuseButton({ text, userType }) {
  return (
    <button className={`brad-md button-reuse button-reuse--${userType}`}>
      {text}
    </button>
  );
}

export default ReuseButton;
