import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import registerBanner from '../Components/Assets/login_banner.png';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Send registration data to the server
      const response = await axios.post('https://3000-chevonnelis-proj2backen-lqv6rdz4jy0.ws-us110.gitpod.io/api/users/register', { email, password });
      console.log(response.data); // Log the response for debugging
      alert('Registration successful');
    } catch (error) {
      setError(error.response.data.error || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
      <div style={{ flex: 1 }}>
        <img src={registerBanner} alt="RegisterBanner" style={{ width: '50vw', height: '80vh' }} />
      </div>
      <div style={{ flex: 1, marginLeft: '100px', justifyContent: 'center', alignItems: 'center', maxHeight: '50vh'  }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
        <h1 style={{ marginBottom: '20px' }}>Register</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'top', width: '30vw', height: '40vh'}}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{ width: '100%' }}
              required
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{ width: '100%' }}
              required
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Confirm Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{ width: '100%' }}
              required
            />
          </div>
          <button type="submit" className="btn btn-outline-success" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Register;
