//  use the context userType state, which is set up in the Maincontext to match the color scheme for the usertype in the dropdown of the searchbar. The highlight should be the respective color code of the artist or venue.

import React, { useContext, useRef, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import HandleClickOutside from "../utils/HandleClickOutside";
import "./_CustomDropdown.scss";

import { MdKeyboardArrowDown } from "react-icons/md";

const CustomDropdown = ({ state, onChange, options, type }) => {
  const context = useContext(MainContext);
  const [isOpen, setIsOpen] = useState(false);
  const [displayLabel, setDisplayLabel] = useState("");

  const ref = useRef(null);

  HandleClickOutside(ref, setIsOpen);

  return (
    <div
      className={`dropdown--input ${isOpen ? "input--no-bottom-borders" : null}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <span>{displayLabel ? displayLabel : type}</span>
      <span
        className="dropdown-arrow"
        style={{ transform: isOpen && "rotate(-180deg)" }}
      >
        <MdKeyboardArrowDown />
      </span>
      <ul
        ref={ref}
        className={`custom-dropdown-list ${isOpen ? "dropdown-visible" : ""}`}
      >
        <li
          className={`list-item-no-selection
            ${
              context.userType === "artists"
                ? "artists-list-item"
                : "venues-list-item"
            }
          `}
          onClick={() => {
            onChange("");
            setDisplayLabel("");
          }}
        >
          ---
        </li>
        {options.map((option) => (
          <li
            className={
              context.userType === "artists"
                ? "artists-list-item"
                : "venues-list-item"
            }
            key={option.label}
            value={option.value}
            onClick={() => {
              onChange(option.value);
              setDisplayLabel(option.label);
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomDropdown;
