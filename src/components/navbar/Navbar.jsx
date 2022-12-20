import React, { useState } from "react";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import { Link, NavLink, useLocation } from "react-router-dom";

import "./_Navbar.scss";
import venuLogo from "../../img/venu-logo.png";
import Sidebar from "../navbar/Sidebar";
import NavbarLink from "./NavbarLink";
import NavbarDropdown from "./NavbarDropdown";

export default function Navbar() {
  const { showSidebar, setShowSidebar } = useContext(MainContext);

  const context = useContext(MainContext);

  function closeSidebar() {
    setShowSidebar(false);
  }

  return (
    <>
      <div
        className={`navbar ${
          context.userType === "artists"
            ? "navbar--artists"
            : context.userType === "venues"
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
          <NavbarDropdown type="login" />
          <NavbarDropdown type="signup" />
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
