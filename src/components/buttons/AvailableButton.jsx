import React from "react";
import "./_AvailableButton.scss";

const AvailableButton = ({ available }) => {
  return (
    <button
      type="button"
      className={`available-button ${
        available ? "available-button--available" : "available-button--unavailable"
      }`}
    >
      {available ? "Available" : "Unavailable"}
    </button>
  );
};

export default AvailableButton;
