import { Outlet } from "react-router-dom";
import Navbar from "../../navbar/Navbar";
import "../../../App.scss";
import { useContext } from "react";
import { MainContext } from "../../contexts/MainContext";

function NavbarLayout() {
  const { showSidebar } = useContext(MainContext);

  return (
    <div>
      <Navbar />
      <div className={`content-container ${showSidebar ? "blur-wrapper" : "false"}`}>
        <Outlet />
      </div>
    </div>
  );
}

export default NavbarLayout;
