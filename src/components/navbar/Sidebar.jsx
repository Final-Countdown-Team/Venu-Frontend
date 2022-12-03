import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { MainContext } from "../contexts/MainContext";

export default function Sidebar({ links, close }) {
  const { showSidebar } = useContext(MainContext);

  const location = useLocation();

  return (
    <div
      className="sidebar"
      onClick={close}
      style={
        !showSidebar
          ? {
              transform: "translateY(-100%)",
              visibility: "hidden",
              userSelect: "none",
            }
          : {}
      }
    >
      {links.map((link) => (
        <Link
          to={link.path}
          className={
            location.pathname === link.path
              ? "sidebar-link active"
              : "sidebar-link"
          }
          key={link.name}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
