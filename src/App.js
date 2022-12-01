import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss";

import Signup from "./components/pages/Signup";
import NavbarLayout from "./components/navbar/NavbarLayout";
import Home from "./components/pages/Home";
import SearchBar from "./components/search/SearchBar";


function App() {
  return (
    <Router>
      <div className="wrapper">
        <SearchBar />
        <Routes>
          <Route path="/" element={<NavbarLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/venues/signup" element={<Signup type={"venues"} />} />
          <Route path="/artists/signup" element={<Signup type={"artists"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
