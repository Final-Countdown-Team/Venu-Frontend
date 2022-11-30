import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss";
import Signup from "./components/pages/Signup";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="wrapper">
        <Routes>
          <Route path="/" />
          <Route path="/venues/signup" element={<Signup type={"venues"} />} />
          <Route path="/artists/signup" element={<Signup type={"artists"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
