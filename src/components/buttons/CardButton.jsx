import React from "react";
import "../buttons/_CardButton.scss";
import { HiArrowRight as ArrowRight } from "react-icons/hi";

export const CardButton = ({ userType }) => {
  return (
    <button className={`card-button card-button--${userType}`}>
      <span>Visit Profile</span>
      <div className="button-arrow">
        <ArrowRight />
      </div>
    </button>
  );
};
