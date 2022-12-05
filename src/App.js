import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss";

import Footer from "./components/footer/Footer";



import Signup from "./components/pages/Signup";
import NavbarLayout from "./components/navbar/NavbarLayout";
import Home from "./components/pages/Home";
import VenuesOverview from "./components/pages/VenuesOverview";
import Login from "./components/pages/Login";
import ProfileEdit from "./components/pages/ProfileEdit";
import { MainContext } from "./components/contexts/MainContext";
import { useContext } from "react";
import { useEffect } from "react";

function App() {
  const { showSidebar } = useContext(MainContext);

  useEffect(() => {
    showSidebar
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [showSidebar]);

  return (
    <Router>
      <div
        className="wrapper"
        style={{ overflow: showSidebar ? "hidden" : "" }}
      >
        <Routes>
          <Route path="/" element={<NavbarLayout />}>
            <Route index element={<Home />} />
            <Route path="/venues" element={<VenuesOverview />} />
            <Route path="/artists" element={<VenuesOverview />} />
            <Route path="/me/profile" element={<ProfileEdit />} />
          </Route>
          <Route path="/venues/login" element={<Login userType={"venues"} />} />
          <Route
            path="/venues/signup"
            element={<Signup userType={"venues"} />}
          />
          <Route
            path="/artists/login"
            element={<Login userType={"artists"} />}
          />
          <Route
            path="/artists/signup"
            element={<Signup userType={"artists"} />}
          />
        </Routes>
        
        <Footer/>
      </div>
      
    </Router>

  );
}

export default App;
{/* <div className="page-container">
          <div className="content-wrap"> 
          </div>
        </div>*/}
       