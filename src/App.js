// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignUpForm from './components/SignUpForm';
import Login from './components/Login';
import MainService from './components/MainService';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main-service" element={<MainService />} />
      </Routes>
    </Router>
  );
}

export default App;
