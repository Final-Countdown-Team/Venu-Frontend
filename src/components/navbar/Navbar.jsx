import React from "react";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import { Link } from "react-router-dom";

import "./_Navbar.scss";
import venuLogo from "../../img/venu-logo.png";
import Sidebar from "./Sidebar";
import NavbarLink from "./NavbarLink";
import NavbarDropdown from "./NavbarDropdown";
import LogoutLink from "./LogoutLink";

export default function Navbar() {
  const { showSidebar, setShowSidebar, globalUserType, isLoggedIn } =
    useContext(MainContext);

  function closeSidebar() {
    setShowSidebar(false);
  }
  return (
    <>
      <div
        className={`navbar ${
          globalUserType === "artists"
            ? "navbar--artists"
            : globalUserType === "venues"
            ? "navbar--venues"
            : "null"
        }`}
      >
        <Link to="/" className={`logo ${showSidebar && "logo-active"}`}>
          <img
            src={venuLogo}
            alt="company logo"
            width="50"
            height="50"
            boarder-radius="50"
          />
          <span>Venu</span>
        </Link>
        <div className={`nav-links`}>
          <NavbarLink path="/" name="Home" />
          <NavbarLink path="/artists" name="Artists" />
          <NavbarLink path="/venues" name="Venues" />
          {isLoggedIn ? (
            <>
              <NavbarLink path={`/me`} name="Profile" />
              <NavbarLink path={`/me/editProfile`} name="Edit" />
              <LogoutLink name="Logout" />
            </>
          ) : (
            <>
              <NavbarDropdown type="login" />
              <NavbarDropdown type="signup" />
            </>
          )}
        </div>
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className={`sidebar-btn ${showSidebar && "active"}`}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
      <Sidebar close={closeSidebar} />
    </>
  );
}
