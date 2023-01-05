import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import { MainContext } from "./components/contexts/MainContext";
import { useContext, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

import "./App.scss";

import NavbarLayout from "./components/utils/outlets/NavbarLayout";
import Overview from "./components/pages/Overview";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";

import Home from "./components/pages/Home";
import ProfileEdit from "./components/pages/ProfileEdit";
import SignupLogin from "./components/pages/SignupLogin";
import UserProfile from "./components/userProfile/UserProfile";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import FourOhFour from "./components/pages/FourOhFour";
import WatchProfilePage from "./components/pages/WatchProfilePage";
import WatchUserProfilePage from "./components/pages/WatchUserProfilePage";

function App() {
  const { showSidebar, isLoggedIn } = useContext(MainContext);
  const location = useLocation();

  // Set overflow of body based on whether navbar overlay is showing or not
  useEffect(() => {
    showSidebar
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [showSidebar]);

  return (
    <div
      className={`wrapper ${isLoggedIn && "wrapper--loginState"}`}
      style={{ overflow: showSidebar ? "hidden" : "" }}
    >
      <Toaster position="top-center" />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Routes with classic navbar and footer layout */}
          <Route path="/" element={<NavbarLayout />}>
            <Route index element={<Home />} />

            <Route path="/venues" element={<Outlet />}>
              <Route index element={<Overview userType={"venues"} />} />
              <Route
                path="profile/:id"
                element={<WatchProfilePage userType="venues" />}
              />
            </Route>

            <Route path="/artists" element={<Outlet />}>
              <Route index element={<Overview userType={"artists"} />} />
              <Route
                path="profile/:id"
                exact
                element={
                  isLoggedIn ? (
                    <WatchProfilePage userType="artists" />
                  ) : (
                    <SignupLogin />
                  )
                }
              />
            </Route>

            <Route
              path="/me"
              element={isLoggedIn ? <WatchUserProfilePage /> : <SignupLogin />}
            />
            <Route
              path="/me/editProfile"
              element={isLoggedIn ? <ProfileEdit /> : <SignupLogin />}
            />
          </Route>

          {/* Routes without navbar and footer */}
          <Route path="/signupLogin" element={<SignupLogin />} />
          <Route path="/venues/login" element={<Login userType={"venues"} />} />
          <Route path="/venues/signup" element={<Signup userType={"venues"} />} />
          <Route path="/artists/login" element={<Login userType={"artists"} />} />
          <Route path="/artists/signup" element={<Signup userType={"artists"} />} />
          <Route
            path="/:userType/resetPassword/:resetToken"
            element={<ResetPasswordPage />}
          />
          <Route path="*" element={<FourOhFour />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
