import React from "react";
import "./_ButtonSecondary.scss";

function ButtonSecondary({ text, link, submit, type }) {
  return (
    <button
      type={submit && "submit"}
      className={`button-secondary ${
        type === "venue"
          ? "button-secondary--venue"
          : "button-secondary--artist"
      }`}
    >
      {text}
    </button>
  );
}

export default ButtonSecondary;
