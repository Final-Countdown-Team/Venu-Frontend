import React from "react";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import { Link, useLocation } from "react-router-dom";

import "./_Navbar.scss";
import venuLogo from "../../img/venu-logo.png";
import Sidebar from "../navbar/Sidebar";

export default function Navbar() {
  const { showSidebar, setShowSidebar } = useContext(MainContext);

  const context = useContext(MainContext);

  const location = useLocation();

  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "artists",
      path: "/artists",
    },
    {
      name: "Venues",
      path: "/venues",
    },
    {
      name: "login",
      path: "/signupLogin",
    },
    {
      name: "sign up",
      path: "/signupLogin",
    },
  ];

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
          {links.map((link) => (
            <Link
              className={location.pathname === link.path ? "active" : ""}
              to={link.path}
              key={link.name}
            >
              {link.name}
              <span
                className={`nav-links--underline ${
                  context.userType === "artists" && "nav-links--artists"
                }`}
              />
            </Link>
          ))}
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
      <Sidebar close={closeSidebar} links={links} />
    </>
  );
}
