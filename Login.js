import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null); // State to handle login errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting login form...');
    try {
      const response = await axios.post('http://localhost:3001/api/login', { email, password });
      console.log('Login response:', response.data);
      onLogin();
      setLoggedIn(true);
    } catch (error) {
      console.error('Error logging in:', error);
      // Update error state with the error message from the server
      setError(error.response.data.message);
    }
  };

  if (loggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="container">
      <div className="login-container">
      <img src="https://res.cloudinary.com/digicomm/image/upload/t_metadata/news-magazine/2020/_assets/48523956526_fb7dc2b9e6_k.jpg" alt="Login Background" className="login-background" style={{ width: '100%', height: '100%' }} />
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control input-field" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control input-field" id="exampleInputPassword1" placeholder="Password" required />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
