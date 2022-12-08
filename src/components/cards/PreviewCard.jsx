import React from "react";
import { CardButton } from "../buttons/CardButton";
import "./_Preview-card.scss";

export default function PreviewCard({ img, name, description, userType }) {
  return (
    <div className="card-container">
      <img className="preview-userImage" src={img} alt="profile pic"></img>
      <div className="card-text-content">
        <div className="card-title">{name}</div>
        <div className="card-desc">{description}</div>
        <div className="card-profile-button">
          <CardButton userType={userType} />
        </div>
      </div>
    </div>
  );
}
