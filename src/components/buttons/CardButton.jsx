import React from "react";
import { Link } from "react-router-dom";
import "../buttons/_CardButton.scss";
import { HiArrowRight as ArrowRight } from "react-icons/hi";

export const CardButton = ({ userType, link }) => {
  console.log(link);
  return (
    <Link to={`/${userType}/profile/${link}`}>
      <button className={`card-button card-button--${userType}`}>
        <span>Visit Profile</span>
        <div className="button-arrow">
          <ArrowRight />
        </div>
      </button>
    </Link>
  );
};
