
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onAddTask,name,logout }) => {
  console.log("gjdsd",name);
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Kanban Board</h1>
      </div>
      <div className="navbar-actions">
        
      {name && (
          <button className="add-task-button" onClick={onAddTask}>Add Task</button>
          )}   
     </div>
      <div className="text">
        <span >{name}</span>
       
        {name ? (
          <button onClick={logout} >Logout</button>
        ) : (
          <Link to="/login">Signin</Link>
        )}
       
          
        
      </div>
      
    </nav>
  );
};

export default Navbar;