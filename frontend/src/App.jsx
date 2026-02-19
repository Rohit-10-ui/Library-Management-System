import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Landing from "./Components/Landing";
import AdminDashboard from "./Components/Admindashboard";
import BookMangement from "./Components/BookMangement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/admindashboard" element={<AdminDashboard />}/>
        <Route path="/books" element={<BookMangement />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;