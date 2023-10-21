import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState(''); // Change "email" to "username"
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const headers = {
        'Content-Type': 'application/json'
      };

      const userData = {
        username: username, // Change "email" to "username"
        password: password
      };

      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/login`, userData, { headers });

      if (response.status === 201) {
        console.log('Logging in...', userData);
        navigate('/main-server');
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label htmlFor="username">Username:</label> {/* Change "Email" to "Username" */}
          <input
            type="text" // Change "email" to "text"
            id="username" // Change "email" to "username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
        <p>
          はじめての方は <button onClick={() => navigate('/signup')}>ここをクリック</button>
        </p>
      </form>
    </div>
  );
}

export default Login;
