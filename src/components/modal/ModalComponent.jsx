import React, { useContext } from "react";
import InputFull from "../forms/formInputs/InputFull";
import ButtonSecondary from "../buttons/ButtonSecondary";
import { MdClose } from "react-icons/md";
import { ScaleLoader } from "react-spinners";
import { MainContext } from "../contexts/MainContext";

function ModalComponent({ onClick, isPending, ref }) {
  const { globalUserType } = useContext(MainContext);

  return (
    <div className="login-form">
      <div onClick={onClick} className="close-icon">
        <MdClose />
      </div>
      <h2>
        You forgot your password<span>?</span>
      </h2>
      <p className="padding">
        No problem, we got you. Please enter your email address and we will send you
        a link to reset your password ☺️
      </p>
      <InputFull name="email" placeholder={"Please enter your email"} />
      <div className="padding">
        {!isPending ? (
          <ButtonSecondary submit={true} text={"Send reset link"} />
        ) : (
          <ScaleLoader
            color={globalUserType === "artists" ? "#0168b5" : "#b02476"}
            aria-label="Loading Spinner"
            cssOverride={{ height: "5rem)" }}
          />
        )}
      </div>
    </div>
  );
}

export default ModalComponent;
