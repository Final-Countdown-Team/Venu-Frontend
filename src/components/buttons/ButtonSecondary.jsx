import React from "react";
import "./_ButtonSecondary.scss";

function ButtonSecondary({ text, purpose, submit, userType }) {
  return (
    <button
      type={submit && "submit"}
      className={`button-secondary ${
        userType === "venues"
          ? "button-secondary--venue"
          : "button-secondary--artist"
      } ${purpose === "login" && "button-login"}
      ${purpose === "search" && "button-search"}`}
    >
      {text}
    </button>
  );
}

export default ButtonSecondary;
