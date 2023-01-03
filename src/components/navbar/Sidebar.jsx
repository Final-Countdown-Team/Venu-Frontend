import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import LogoutLink from "./LogoutLink";
import NavbarLink from "./NavbarLink";

export default function Sidebar({ close }) {
  const { showSidebar, loggedInUser } = useContext(MainContext);

  return (
    <div
      className="sidebar"
      onClick={close}
      style={
        showSidebar
          ? {
              transform: "translateY(0)",
              visibility: "visible",
              userSelect: "all",
            }
          : {}
      }
    >
      <NavbarLink path="/" name="Home" sidebar={true} />
      <NavbarLink path="/artists" name="Artists" sidebar={true} />
      <NavbarLink path="/venues" name="Venues" sidebar={true} />
      {loggedInUser ? (
        <>
          <NavbarLink path={`/me`} name="Profile" sidebar={true} />
          <NavbarLink path={`/me/editProfile`} name="Edit Profile" sidebar={true} />
          <LogoutLink name="Logout" sidebar={true} />
        </>
      ) : (
        <>
          <NavbarLink path={"/signupLogin"} name={"Login"} sidebar={true} />
          <NavbarLink path={"/signupLogin"} name={"Signup"} sidebar={true} />
        </>
      )}
    </div>
  );
}
