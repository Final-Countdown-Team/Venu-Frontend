import React, { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import "./_ButtonSecondary.scss";

function ButtonSecondary({ text, purpose, submit, userType }) {
  const context = useContext(MainContext);

  const userColorType = !userType ? context.userType : userType;

  return (
    <button
      type={submit && "submit"}
      className={`button-secondary ${
        userColorType === "venues"
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
