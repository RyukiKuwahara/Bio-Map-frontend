import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div>
      <div id="header">
        <tittle>Bio-Map</tittle>
        <Link to="/login">
          <div id="example">
            log in
          </div>
        </Link>
      </div>

      <div id="map">
        map だよー
      </div>
    </div>
  );
}

export default Home;
