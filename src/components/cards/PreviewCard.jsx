import React from "react";
import { CardButton } from "../buttons/CardButton";
import "./_Preview-card.scss";

export default function PreviewCard(props) {
  return (
    <div className="card-container">
      <div className="float-layout">
        <div className="card-image">
          <img src={props.img} alt="profile pic"></img>
          <div className="card">
            <div className="card-title">{props.name}</div>
            <div className="card-desc">{props.description}</div>
            <div className="profile-button">
              <CardButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
