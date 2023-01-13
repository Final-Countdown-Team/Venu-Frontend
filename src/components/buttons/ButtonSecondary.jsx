import React, { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import "./_ButtonSecondary.scss";

function ButtonSecondary({ text, purpose, submit, userType, onClick }) {
  const { globalUserType } = useContext(MainContext);
  const userColorType = !userType ? globalUserType : userType;

  return (
    <button
      onClick={onClick}
      type={submit && "submit"}
      className={`brad-md button-secondary button-secondary--${userColorType}
      ${purpose === "login" && "button-login"}
      ${purpose === "search" && "button-search"}`}
    >
      {text}
    </button>
  );
}

export default ButtonSecondary;
