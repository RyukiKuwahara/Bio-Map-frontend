import React, { useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import MapContainer from '../components/MapContainer';
import axios from 'axios';


function Home() {
  const [data, setData] = useState('');

  const handleSearch = async () => {
    const query = document.querySelector('.search-form input').value;
    const apiUrl = process.env.REACT_APP_API_URL;
  
    try {
      const headers = {
        'Content-Type': 'application/json'
      };
      const response = await axios.post(`${apiUrl}/search/`, query, headers);
      const resData = await response.json();
      setData(resData)
      
    } catch (error) {
      console.error('エラー:', error);
    }
  };  

  return (
    <>
      <div className="header">
        <div className="title">BIO-MAP</div>
        <div className="search-form">
          <input type="text" placeholder="検索フォーム" />
          <button type="submit" onClick={handleSearch}>検索</button>
        </div>
        <Link to="/login" className="login-button">Login</Link>
      </div>
      <MapContainer data={data}/>
    </>
  );
}

export default Home;
