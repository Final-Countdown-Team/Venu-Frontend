import React from 'react';
import "./_AvailableButton.scss"


const AvailableButton = ({ available, onClick }) => {
  const buttonStyle = {
    backgroundColor: available ? "#347d39" : "#e5534b",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      style={buttonStyle}
    >
      {available ? 'Available' : 'Unavailable'}
    </button>
  );
}

export default AvailableButton;