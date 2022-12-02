import React from "react";
import "./_ButtonSecondary.scss";

function ButtonSecondary({ text, purpose, submit, type }) {
  return (
    <button
      type={submit && "submit"}
      className={`button-secondary ${
        type === "venues"
          ? "button-secondary--venue"
          : "button-secondary--artist"
      } ${purpose === "login" && "button-login"}`}
    >
      {text}
    </button>
  );
}

export default ButtonSecondary;
