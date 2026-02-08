import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
