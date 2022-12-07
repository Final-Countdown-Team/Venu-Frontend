import React from 'react';
import "../buttons/_CardButton.scss";




export const CardButton = () => {
  return (
    <div className="card-button">
      <button>
        Visit Profile
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
}
