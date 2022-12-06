import React from 'react';
import "./_Preview-card.scss";


export default function PreviewCard() {
  return (
    <div class="card-container">
      <div class="float-layout">
        <div class="card-image">
          <img
            src="http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcTYiQcFe-WmL2c9zefm1O1aDnRzz5QuEUK06F-bYAQdALalZjlGiCZkKp9GvV3crsSaJtofK-xziOe7hso"
            alt="logo"
          ></img>
          <div class="card">
            <div class="card-title">Title</div>
            <div class="card-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              ullamcorper mollis tempus. Mauris eu maximus lectus, eu auctor
              justo. Aenean porta purus vel commodo consequat.
            </div>
            <button className='button-secondary'>Click me!</button>
          </div>
        </div>
      </div>
    </div>
  );
}
