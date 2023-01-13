import React from "react";
import { Link } from "react-router-dom";
import "./_CardButton.scss";
import { HiArrowRight as ArrowRight } from "react-icons/hi";

export const CardButton = ({ userType, link, text }) => {
  return (
    <Link to={link}>
      <button
        className={`brad-md card-button card-button--${userType} edit-profile-btn`}
      >
        <span>{text}</span>
        <div className="button-arrow">
          <ArrowRight />
        </div>
      </button>
    </Link>
  );
};
