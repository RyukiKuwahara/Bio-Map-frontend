// src/components/SignUpForm.js

import React, { useState } from 'react';
import axios from 'axios';

function SignUpForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {

      const headers = {
        'Content-Type': 'application/json'
      };

      const user = {
        "username": username,
        "email": email,
        "password": password
      };
      
      const response = await axios.post('http://localhost:8080/users', user, { headers });
      if (response.status === 201) {
        setSuccess(true);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div>
      {isSuccess ? (
        <div>
          <h2>Registration Successful!</h2>
          <p>Please check your email for further instructions.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      )}
    </div>
  );
}

export default SignUpForm;
