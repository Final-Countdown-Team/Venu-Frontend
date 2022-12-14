//  use the context userType state, which is set up in the Maincontext to match the color scheme for the usertype in the dropdown of the searchbar. The highlight should be the respective color code of the artist or venue.

import React, { useContext } from 'react';
import { MainContext } from '../../contexts/MainContext';
import './CustomDropdown.scss';

const CustomDropdown = ({ options, value, onChange }) => {
  const { userType } = useContext(MainContext);
  return (
    <select
      className={`custom-dropdown ${userType}`}
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default CustomDropdown;