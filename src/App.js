import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import  Home  from "./pages/Home";
import Register from "./pages/Register"
import  Login  from "./pages/Login";
import ProviderDashboard from "./pages/ProviderDashboard";
import BookService from "./pages/BookService";
import Services from "./pages/Services";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import ProviderBookings from "./pages/ProviderBookings";

function App() {
  return (
    <div id="root">
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="provider-dashboard" element={<ProviderDashboard />} />
          <Route path="/services" element={<Services />} />
          <Route path="/book/:id" element={<BookService />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/provider-bookings" element={<ProviderBookings />} />
        </Routes>
      </Router>
    </AuthProvider>
    </div>
  )
}

export default App;