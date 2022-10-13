// Importing modules
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Map from "./pages/MapOL";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Register" element={<Register />} />
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/Map" element={<Map />} />
          <Route path="*" element={<h1>404: Not Found</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
