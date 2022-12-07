import React from "react";
import { CardButton } from "../buttons/CardButton";
import "./_Preview-card.scss";

export default function PreviewCard(props) {
  return (
    <div class="card-container">
      <div class="float-layout">
        <div class="card-image">
          <img src={props.img} alt="profile pic"></img>
          <div class="card">
            <div class="card-title">{props.name}</div>
            <div class="card-desc">{props.description}</div>
            <div className="button"><CardButton /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
