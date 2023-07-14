import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div className="home-container">
      <h2>Welcome to Bio-Map</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consequat ante at neque consectetur, at malesuada sem tincidunt. Suspendisse tristique risus ut congue convallis.</p>
      <Link to="/signup">Sign Up</Link>

    </div>
  );
}

export default Home;
