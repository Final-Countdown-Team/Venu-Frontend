import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import { MainContext } from "./components/contexts/MainContext";
import { useContext, useEffect, lazy } from "react";
import { AnimatePresence } from "framer-motion";

import "./App.scss";

import NavbarLayout from "./components/utils/outlets/NavbarLayout";
import Overview from "./components/pages/Overview";

const Home = lazy(() => import("./components/pages/Home"));
const ProfileEdit = lazy(() => import("./components/pages/ProfileEdit"));
const SignupLogin = lazy(() => import("./components/pages/SignupLogin"));
const UserProfile = lazy(() => import("./components/pages/UserProfile"));
const Signup = lazy(() => import("./components/pages/Signup"));
const Login = lazy(() => import("./components/pages/Login"));
const FourOhFour = lazy(() => import("./components/pages/FourOhFour"));

function App() {
  const { showSidebar } = useContext(MainContext);

  const location = useLocation();

  useEffect(() => {
    showSidebar
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [showSidebar]);

  return (
    <div className="wrapper" style={{ overflow: showSidebar ? "hidden" : "" }}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Routes with classic navbar and footer layout */}
          <Route path="/" element={<NavbarLayout />}>
            <Route index element={<Home />} />

            <Route path="/venues" element={<Outlet />}>
              <Route index element={<Overview userType={"venues"} />} />
              <Route
                path="profile/:id"
                element={<UserProfile userType="venues" />}
              />
            </Route>

            <Route path="/artists" element={<Outlet />}>
              <Route index element={<Overview userType={"artists"} />} />
              <Route
                path="profile/:id"
                element={<UserProfile userType="artists" />}
              />
            </Route>

            <Route path="/me/profile" element={<ProfileEdit />} />
            <Route path="/user/:id" element={<UserProfile />} />
          </Route>

          {/* Routes without navbar and footer */}
          <Route path="/signupLogin" element={<SignupLogin />} />
          <Route path="/venues/login" element={<Login userType={"venues"} />} />
          <Route path="/venues/signup" element={<Signup userType={"venues"} />} />
          <Route path="/artists/login" element={<Login userType={"artists"} />} />
          <Route path="/artists/signup" element={<Signup userType={"artists"} />} />
          <Route path="*" element={<FourOhFour />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
