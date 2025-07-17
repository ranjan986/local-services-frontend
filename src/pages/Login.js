import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
   const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://local-services-backend.onrender.com/api/auth/login', formData);
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className='login-container'>
        <h2>Login</h2>
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
    </div>
  );
};

export default Login;
