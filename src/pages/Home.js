import React from 'react';
import './Home.css';
import {Button} from './index.js';


function Home() {
  return (
    <div>
      <div id="header">
        <h2>Bio-Map</h2>
        <Button name={'login'} />
      </div>

      <div id="map">
        map だよー
      </div>
    </div>
  );
}

export default Home;
