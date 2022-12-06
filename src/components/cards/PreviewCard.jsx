import React from 'react';
import "./_Preview-card.scss";


export default function PreviewCard(props) {
  return (
    <div class="card-container">
      <div class="float-layout">
        <div class="card-image">
          <img src={props.img} alt="profile pic"
          ></img>
          <div class="card">
            <div class="card-title">{props.name}</div>
            <div class="card-desc">
              {props.description}
            </div>
            <button className='button-secondary'>Visit profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}
