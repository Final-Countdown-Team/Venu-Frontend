import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { MdKeyboardArrowDown } from "react-icons/md";
import "./_Navbar.scss";
import { MainContext } from "../contexts/MainContext";

function NavbarDropdown({ type }) {
  const context = useContext(MainContext);

  const [isOpen, setIsOpen] = useState(false);

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar-dropdown">
      <Link
        className="navbar-link dropdown-link"
        onMouseEnter={() => handleDropdown()}
        style={{ filter: isOpen && "blur(1px)" }}
      >
        <span>{type}</span>

        <span className="icon" style={{ transform: isOpen && "rotate(180deg)" }}>
          <MdKeyboardArrowDown />
        </span>
      </Link>

      {isOpen && (
        <ul onMouseLeave={() => handleDropdown()} className="dropdown-menu">
          <li />
          <li>
            <NavLink className={"navbar-link"} to={`/artists/${type}`}>
              Artists
              <span
                className={`nav-links--underline ${
                  context.userType === "artists" && "nav-links--artists"
                }`}
              />
            </NavLink>
          </li>
          <li>
            <NavLink className={"navbar-link"} to={`/venues/${type}`}>
              Venues
              <span
                className={`nav-links--underline ${
                  context.userType === "artists" && "nav-links--artists"
                }`}
              />
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
}

export default NavbarDropdown;
