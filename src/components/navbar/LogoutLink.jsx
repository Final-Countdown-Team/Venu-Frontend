import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainContext } from "../contexts/MainContext";

function LogoutLink({ name, sidebar }) {
  const { userType, isLoggedIn, setIsLoggedIn } = useContext(MainContext);
  const navigate = useNavigate();

  const logout = async () => {
    await fetch(`/${isLoggedIn.userType}/logout`);
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <Link onClick={logout} className={`navbar-link ${sidebar && "sidebar-link"}`}>
      {name}
      <span
        className={`nav-links--underline ${
          userType === "artists" && "nav-links--artists"
        }`}
      />
    </Link>
  );
}

export default LogoutLink;
