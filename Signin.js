import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; 
import { toast } from "react-toastify";

function Signin() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to handle signin errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/register', {
        username,
        email,
        password
      });
      console.log(response.data);
      // Handle successful Signin, e.g., display success message
      toast.success("Student registered successfully");
    } catch (error) {
      console.error(error.response.data);
      // Update error state with the error message from the server
      setError(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <img src="http://acm-icac2013.cis.fiu.edu/images/fiu-logo.jpg" alt="FIU Logo" className="logo" width="50%" height="50%" />
      <h2>Signin</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control input-field" required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control input-field" required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control input-field" required />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn btn-success">Register</button>
      </form>
    </div>
  );
}

export default Signin;
