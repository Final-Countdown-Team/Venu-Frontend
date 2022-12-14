import React from "react";
import AvailableButton from "../buttons/AvailableButton";
import { CardButton } from "../buttons/CardButton";
import "./_Preview-card.scss";

export default function PreviewCard({
  img,
  name,
  description,
  userType,
  id,
  availability,
}) {
  return (
    <div className="card-container">
      <div className="userImage-container">
        <img className="preview-userImage" src={img} alt="profile pic" />
        <div className="preview-available-button--position">
          <AvailableButton available={availability} />
        </div>
      </div>
      <div className="card-text-content">
        <div className="card-title">{name}</div>
        <div className="card-desc">{description}</div>
        <div className="card-profile-button">
          <CardButton userType={userType} link={id} />
        </div>
      </div>
    </div>
  );
}
