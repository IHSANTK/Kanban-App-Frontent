import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from '../../api'; 
import './Signup.css';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('/signup', {
        name: formData.name,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });
      console.log('User created:', response.data.name);
      if(response.status === 200){
        localStorage.setItem('token', response.data.token);
        console.log(response.data.name);
        navigate('/login');
      }else{
        alert("not")
      }
    } catch (error) {
      console.error('Error creating user:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="input-field"
          required
        />
       
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="input-field"
          required
        />
        <button type="submit" className="signup-button">Sign Up</button>
        <div className="signup-link">If Allredy Login<a href="/Loginpage">Login</a></div>

      </form>
    </div>
  );
}