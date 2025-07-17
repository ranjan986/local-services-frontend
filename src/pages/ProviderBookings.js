import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./ProviderBookings.css";

const ProviderBookings = () => {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings/provider", {
          headers: {
            Authorization: `Bearer ${token}`, // Make sure your backend expects 'Bearer'
          },
        });
        setBookings(res.data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      }
    };

    fetchBookings();
  }, [token]);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/update-status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Refresh the list after status update
      const updated = await axios.get("http://localhost:5000/api/bookings/provider", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(updated.data);
    } catch (error) {
      console.error("Failed to update booking status", error);
    }
  };

  return (
    <div className="provider-bookings-container">
      <h2>Bookings For Your Services</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((b) => (
          <div className="booking-card" key={b._id}>
            <h3>{b.service?.title}</h3>
            <p>
              Customer: {b.user?.name} ({b.user?.email})
            </p>
            <p>Date: {new Date(b.date).toLocaleDateString()}</p>
            <p>
              Status: <strong>{b.status}</strong>
            </p>

            <select
              value={b.status}
              onChange={(e) => handleStatusChange(b._id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        ))
      )}
    </div>
  );
};

export default ProviderBookings;
