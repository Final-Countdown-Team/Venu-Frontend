import React from "react";
import "./_Reusable_BB.scss";

function ReuseButton({ text, userType }) {
  return (
    <button
      className={`button-reuse ${
        userType === "venues" ? "button-reuse--venue" : "button-reuse--artist"
      }`}
    >
      {text}
    </button>
  );
}

export default ReuseButton;
