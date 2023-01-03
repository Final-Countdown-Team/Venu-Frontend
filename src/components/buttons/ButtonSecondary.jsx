import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../contexts/MainContext";
import "./_ButtonSecondary.scss";

function ButtonSecondary({ text, purpose, submit, userType, redirectTo }) {
  const { globalUserType } = useContext(MainContext);
  const navigate = useNavigate();

  const userColorType = !userType ? globalUserType : userType;

  const redirectHandler = () => {
    navigate(redirectTo);
  };

  return (
    <button
      onClick={redirectTo && redirectHandler}
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
