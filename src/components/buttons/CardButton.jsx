import React from 'react';
import "../buttons/_CardButton.scss";
import {BsArrowRightCircle} from 'react-icons/bs';




export const CardButton = () => {
  return (
    <div className="card-button">
      <button>
        Visit Profile
        <div className='button-arrow'>
          <BsArrowRightCircle />
        </div>
      </button>
    </div>
  );
}
