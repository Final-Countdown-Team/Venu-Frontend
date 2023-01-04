import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainContext } from "../contexts/MainContext";

function LogoutLink({ name, sidebar }) {
  const { globalUserType, logoutUser } = useContext(MainContext);
  const navigate = useNavigate();
  return (
    <Link
      onClick={() => logoutUser(navigate, "Logged out!\n Hope to see you soon 🥰")}
      className={`navbar-link ${sidebar && "sidebar-link"}`}
    >
      {name}
      <span
        className={`nav-links--underline ${
          globalUserType === "artists" && "nav-links--artists"
        }`}
      />
    </Link>
  );
}

export default LogoutLink;
