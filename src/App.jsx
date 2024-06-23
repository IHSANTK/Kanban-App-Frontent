import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import KanbanApp from './components/Kanbanapp';
import './App.css';
import Singnuppage from './components/signup/Signuppage';
import Loginpage from './components/login/Loginpage';

const App = () => {
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/"
          element={ <KanbanApp />} 
        />
        <Route 
          path="/signup" 
          element={isAuthenticated() ? <Navigate to="/" /> : <Singnuppage />} 
        />
        <Route 
          path="/login" 
          element={isAuthenticated() ? <Navigate to="/" /> : <Loginpage />} 
        />
        {}
        <Route 
          path="*" 
          element={<Navigate to={isAuthenticated() ? "/" : "/login"} />} 
        />
      </Routes>
    </Router>
  );
};

export default App;