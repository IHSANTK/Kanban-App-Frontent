import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from '../../api';
import './Login.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', { email, password });
      console.log('Login successful:', response.data.name);
      if(response.status === 200){
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('name', response.data.name);
      navigate('/');
      }else{
        alert("pls sign")
      }
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          className="input-field"
          required
        />
        <button type="submit" className="login-button">Login</button>
        {error && <div className="error-message">{error}</div>}
        <div className="signup-link">Don't have an account? <a href="/signup">Signup here</a></div>
      </form>
    </div>
  );
}