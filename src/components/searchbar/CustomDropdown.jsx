import React, { useContext, useRef, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import PropTypes from "prop-types";
import HandleClickOutside from "../utils/HandleClickOutside";
import "./_CustomDropdown.scss";

import { MdKeyboardArrowDown } from "react-icons/md";

const CustomDropdown = ({
  onChange: propsOnChange,
  options,
  type,
  autocomplete,
  userInput,
  setUserInput,
  setLatLng,
  setRadius,
  radius,
  contact,
  setFieldValue,
}) => {
  const { globalUserType, isLoading } = useContext(MainContext);
  // const { setFieldValue } = useFormikContext();
  const [isOpen, setIsOpen] = useState(false);
  const [displayLabel, setDisplayLabel] = useState("");

  // Set ref to dropdown list
  const ref = useRef(null);
  // Close dropdown when user clicks outside of dropdown list
  HandleClickOutside(ref, setIsOpen);

  return (
    <div
      className={`dropdown--input ${autocomplete && "dropdown--no-pointer"} ${
        contact && "dropdown--contact"
      } ${isOpen ? "input--no-bottom-borders" : null}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {!autocomplete ? (
        <>
          <span>{radius ? `${radius}km` : displayLabel ? displayLabel : type}</span>
          <span
            className="dropdown-arrow"
            style={{ transform: isOpen && "rotate(-180deg)" }}
          >
            <MdKeyboardArrowDown />
          </span>
        </>
      ) : (
        <input
          className="autocomplete-input"
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
          type="text"
          placeholder="Enter postcode"
        />
      )}

      {options.length === 0 ? null : (
        <ul
          ref={ref}
          className={`custom-dropdown-list ${isOpen ? "dropdown-visible" : ""}`}
        >
          <li
            className={`list-item-no-selection ${globalUserType}-list-item"`}
            onClick={() => {
              propsOnChange && propsOnChange("");
              setDisplayLabel("");
              if (autocomplete) {
                setRadius("");
                setUserInput("");
                setLatLng("");
              }
            }}
          >
            ---
          </li>
          {!isLoading &&
            options.map((option, i) => {
              const value = typeof option === "string" ? option : option.value;
              let label = typeof option === "string" ? option : option.label;
              if (label.includes("00.000Z")) label = label.substring(0, 10);
              return (
                <li
                  className={`${globalUserType}-list-item`}
                  key={`${label}-${i}`}
                  value={value}
                  onClick={() => {
                    if (autocomplete) {
                      setRadius("10");
                      setLatLng(option.coordinates);
                      setUserInput(label);
                    } else {
                      !contact ? propsOnChange(value) : setFieldValue("date", value);
                    }
                    setDisplayLabel(label);
                  }}
                >
                  {label.includes("00.000Z") ? label.substring(0, 10) : label}
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

CustomDropdown.defaultProps = {
  options: [],
  contact: false,
  autocomplete: false,
  radius: "",
};
CustomDropdown.propTypes = {
  options: PropTypes.array,
};

export default CustomDropdown;
