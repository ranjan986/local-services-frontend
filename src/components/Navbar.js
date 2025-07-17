import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';
import { socket } from '../socket';

const Navbar = () => {
  const [notification, setNotification] = useState(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotification(data);
    });

    return () => socket.off("getNotification");
  }, []);

  const handleNotificationClick = () => {
    setNotification(null); // Clear notification on click
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/services">Services</Link>

      {user && user.role === "customer" && (
        <Link to="/my-bookings">My Bookings</Link>
      )}

      {user && user.role === "provider" && (
        <>
          <Link to="/provider-dashboard">Provider Dashboard</Link>
          <Link to="/provider-bookings">My Bookings</Link>
        </>
      )}

      {user && user.role === "admin" && (
        <Link to="/admin-provider">Admin Dashboard</Link>
      )}

      {user && (
        <>
          <span>Welcome, {user.name}</span>
          <button onClick={logout}>Logout</button>
           <Link to="/notifications" className="notification-icon" onClick={handleNotificationClick}>
            🔔
            {notification && <span className="notification-badge">1</span>}
          </Link>
        </>
      )}

      {!user && (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
