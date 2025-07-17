import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Services.css";

const Services = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [filtered, setFiltered] = useState([]);

  // Fetch services from backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/services/all')
      .then(res => {
        setServices(res.data);
        setFiltered(res.data);
      })
      .catch(() => alert('Error loading services'));
  }, []);

  // Filter logic
  useEffect(() => {
    let results = services;

    // Filter by search
    if (searchTerm) {
      results = results.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (category !== 'all') {
      results = results.filter(service => service.category.toLowerCase() === category.toLowerCase());
    }

    setFiltered(results);
  }, [searchTerm, category, services]);

  // Extract unique categories
  const uniqueCategories = ['all', ...new Set(services.map(s => s.category.toLowerCase()))];

  return (
  <div className="services-container">
    <h2>All Services</h2>

    <div className="services-controls">
      <input
        type="text"
        placeholder="Search services..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {uniqueCategories.map((cat, idx) => (
          <option key={idx} value={cat}>{cat}</option>
        ))}
      </select>
    </div>

    <div className="services-grid">
      {filtered.length > 0 ? (
        filtered.map(service => (
          <div key={service._id} className="service-card">
            <img src={service.image} alt={service.title} />
            <h3>{service.title}</h3>
            <p>{service.description.slice(0, 60)}...</p>
            <strong>₹{service.price}</strong>
            <Link to={`/book/${service._id}`}>Book Now</Link>
          </div>
        ))
      ) : (
        <p className="no-results">No services found.</p>
      )}
    </div>
  </div>
);

};

export default Services;
