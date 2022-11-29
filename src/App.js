import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss";
import Signup from "./components/pages/Signup";

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Routes>
          <Route path="/venues/signup" element={<Signup type={"venues"} />} />
          <Route path="/artists/signup" element={<Signup type={"artists"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
