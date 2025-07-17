import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero">
        <h1>Welcome to Local Services Hub</h1>
        <p>Book trusted professionals for any service at your doorstep</p>
        <Link to="/services" className="hero-btn">Explore Services</Link>
      </div>

      {/* Categories Preview */}
      <div className="categories">
        <h2>Popular Categories</h2>
        <div className="category-grid">
          <div className="category-card">Electrician</div>
          <div className="category-card">Plumber</div>
          <div className="category-card">Carpenter</div>
          <div className="category-card">Cleaning</div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta">
        <h3>Are you a service provider?</h3>
        <Link to="/register" className="cta-btn">Join as Provider</Link>
      </div>
    </div>
  );
};

export default Home;
