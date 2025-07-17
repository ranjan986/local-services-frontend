import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import "./BookService.css";
import { socket } from '../socket';

const BookService = () => {
  const { id } = useParams(); // serviceId from URL
  const navigate = useNavigate();
  const { token, user } = useAuth(); // Get user and token
  const [service, setService] = useState({});
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/services/all');
        const svc = res.data.find(item => item._id === id);
        if (svc) setService(svc);
      } catch (err) {
        console.error("Failed to fetch service", err);
      }
    };

    fetchService();
  }, [id]);

  const handleBooking = async () => {
    if (!date) return alert("Please select a date");

    try {
      const res = await axios.post(
        'http://localhost:5000/api/bookings/create',
        { serviceId: id, date },
        { headers: { Authorization: token } }
      );

      if (res.status === 200) {
        // ✅ Emit notification to provider
        socket.emit("sendNotification", {
          senderName: user.name,
          receiverId: service.provider?._id,
          type: "booking",
          message: `${user.name} booked your service!`,
        });

        alert("Booking successful!");
        navigate('/my-bookings');
      }
    } catch (err) {
      console.error("Booking error", err);
      alert("Booking failed");
    }
  };

  return (
    <div className='book-service'>
      <h2>Book: {service.title}</h2>
      <p>{service.description}</p>
      <label>Select Date:</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <br />
      <button onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
};

export default BookService;
