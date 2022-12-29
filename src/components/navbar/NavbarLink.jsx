import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MainContext } from "../contexts/MainContext";

function NavbarLink({ path, name, sidebar }) {
  const context = useContext(MainContext);
  return (
    <NavLink className={`navbar-link ${sidebar && "sidebar-link"}`} to={path} end>
      {name}
      <span
        className={`nav-links--underline ${
          context.userType === "artists" && "nav-links--artists"
        }`}
      />
    </NavLink>
  );
}

export default NavbarLink;
