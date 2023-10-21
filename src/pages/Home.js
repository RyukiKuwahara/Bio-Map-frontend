import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import MapContainer from '../components/MapContainer';


function Home() {

  return (
    <>
      <div className="header">
        <div className="title">BIO-MAP</div>
        <div className="search-form">
          <input type="text" placeholder="検索フォーム" />
          <button type="submit">検索</button>
        </div>
        <Link to="/login" className="login-button">Login</Link>
      </div>
      <MapContainer />
    </>
  );
}

export default Home;
