import React from "react";
import "./_Reusable_BB.scss";


function ReuseButton({ text, purpose, submit, userType }) {
  console.log(userType);
  return (
    <button
      type={submit && "submit"}
      className={`button-reuse ${
        userType === "venues"
          ? "button-reuse--venue"
          : "button-reuse--artist"
      } ${purpose === "login" && "button-login"}`}
    >
      {text}
    </button>
  );
}

export default ReuseButton;
