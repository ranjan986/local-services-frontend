import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import "./MyBookings.css";

const MyBookings = () => {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/bookings/my', {
      headers: { Authorization: token }
    })
      .then(res => setBookings(res.data))
      .catch(() => alert("Failed to load bookings"));
  }, [token]);
  

  return (
    <div className='my-bookings-container'>
      <h2>My Bookings</h2>
      <div className='bookings-list'>
      {bookings.map((b, index) => (
        <div key={index} className='booking-card' >
          <h3>{b.service?.title}</h3>
          <p>Date: {new Date(b.date).toLocaleDateString()}</p>
          <p>Status: {b.status}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default MyBookings;
