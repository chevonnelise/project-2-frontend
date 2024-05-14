import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import loginBanner from '../Components/Assets/login_banner.png';
import { UserContext } from '../Context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const usercontext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('https://3000-chevonnelis-proj2backen-lqv6rdz4jy0.ws-us110.gitpod.io/api/users/login', { email, password }); // Change the URL to your backend login endpoint
      alert('Login successful');
      window.location.href = 'https://3000-chevonnelis-proj2backen-lqv6rdz4jy0.ws-us110.gitpod.io/login'; 
    } catch (error) {
      alert('Error logging in');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
      <div style={{ flex: 1 }}>
        <img src={loginBanner} alt="LoginBanner" style={{ width: '50vw', height: '85vh' }} />
      </div>
      <div style={{ flex: 1, marginLeft: '100px', justifyContent: 'center', alignItems: 'center', maxHeight: '50vh' }}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <h1 style={{ marginBottom: '20px' }}>Login</h1>
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'top', width: '30vw', height: '30vh'}}>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  style={{ width: '100%' }}
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
                />
              </div>
              {/* Use ternary operator to render either the username or the login button */}
              {usercontext.loginStatus ? (
                <h2>Welcome, {usercontext.username}!</h2>
              ) : (
                <button type="submit" className="btn btn-outline-success" style={{ marginBottom: '10px' }}>Login</button>
              )}
              <Link to="/register" className="btn btn-outline-primary">Register</Link>
            </form>
          </div>
        )}
      </div>
    </div>
  );  
};

export default Login;
