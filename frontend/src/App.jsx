import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Landing from "./Components/Landing";
import AdminDashboard from "./Components/Admindashboard";
import UserDashboard from "./Components/UserDashboard";
import ForgotPassword from "./Components/Forgotpassword";
import BooksPage from "./Components/BooksPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admindashboard" element={<AdminDashboard />}/>
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path="/books" element={<BooksPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
