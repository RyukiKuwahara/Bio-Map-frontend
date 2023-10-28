import React, { useState } from 'react';
import axios from 'axios';
import './SignUpForm.css';
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const headers = {
        'Content-Type': 'application/json'
      };

      const user = {
        username: username,
        email: email,
        password: password
      };

      const apiUrl = process.env.REACT_APP_API_URL; 
      const response = await axios.post(`${apiUrl}/users`, user, { headers });
      if (response.status === 201) {
        setSuccess(true);
      }
    } catch (error) {
      console.log(error.response.data)
      setErrorMessage(error.response.data)
    }
    setLoading(false);
  };

  return (
    <div className="signup-container">
      {isSuccess ? (
        <div className="success-container">
          <h2>Registration Successful!</h2>
          <button type="button" onClick={() => navigate('/login')}>ログイン画面へ進む</button>
        </div>
      ) : (
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <p className="error-message">{errorMessage === "" ? "" : `${errorMessage}`}</p>
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
            <p>※パスワードは，英小文字，英大文字，数字をすべて含む長さ９以上の文字列に設定してください</p>
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
