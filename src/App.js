import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUpForm from './pages/SignUpForm';
import Login from './pages/Login';
import MainService from './pages/MainService';
import MyPage from './pages/MyPage';
import Concept from './pages/Concept';
import { LoadScript } from '@react-google-maps/api';

const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

function App() {
  return (
    <Router>
      <LoadScript googleMapsApiKey={apiKey}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main-service" element={<MainService />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/concept" element={<Concept />} />
        </Routes>
      </LoadScript>
    </Router>
  );
}

export default App;
