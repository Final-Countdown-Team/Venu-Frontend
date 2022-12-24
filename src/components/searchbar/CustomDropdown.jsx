import React, { useContext, useRef, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import HandleClickOutside from "../utils/HandleClickOutside";
import "./_CustomDropdown.scss";

import { MdKeyboardArrowDown } from "react-icons/md";

const CustomDropdown = ({
  state,
  onChange,
  options,
  type,
  autocomplete,
  userInput,
  setUserInput,
  setLatLng,
}) => {
  const context = useContext(MainContext);
  const [isOpen, setIsOpen] = useState(false);
  const [displayLabel, setDisplayLabel] = useState("");

  // Set ref to dropdown list
  const ref = useRef(null);

  // Close dropdown when user clicks outside of dropdown list
  HandleClickOutside(ref, setIsOpen);

  return (
    <div
      className={`dropdown--input ${isOpen ? "input--no-bottom-borders" : null}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {!autocomplete ? (
        <span>{displayLabel ? displayLabel : type}</span>
      ) : (
        <input
          className="autocomplete-input"
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
          type="text"
          placeholder="Enter City"
        />
      )}
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
            setUserInput("");
          }}
        >
          ---
        </li>
        {options.map((option, i) => (
          <li
            className={
              context.userType === "artists"
                ? "artists-list-item"
                : "venues-list-item"
            }
            key={`${option.label}-${i}`}
            value={option.value}
            onClick={() => {
              onChange(option.value);
              setDisplayLabel(option.label);
              if (autocomplete) setLatLng(option.coordinates);
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
