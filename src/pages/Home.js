import React, { useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import MapContainer from '../components/MapContainer';
import axios from 'axios';

function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [postsLength, setPostsLength] = useState(null);

  const handleSearch = async () => {
    const query = document.querySelector('.search-form input').value;
    const apiUrl = process.env.REACT_APP_API_URL;

    const queryData = {
      "name": query,
    };

    setIsLoading(true);

    try {
      const headers = {
        'Content-Type': 'application/json'
      };
      console.log("call /search");
      const response = await axios.post(`${apiUrl}/search`, queryData, { headers });
      setPostsLength(response.data.length)
      setData(response.data);
    } catch (error) {
      console.error('エラー:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="header">
        <div className="title">BIO-MAP</div>
        <Link to="/concept" className='concept'>BIO-MAPとは？</Link>
        <div className="search-form">
          <input type="text" placeholder="検索フォーム" />
          <button type="submit" onClick={handleSearch}>{isLoading ? "検索中..." : "検索"}</button>
        </div>
        <div>{postsLength === null ? "" : `検索結果は ${ postsLength } 件です`}</div>
        <Link to="/login" className="login-button">Login</Link>
      </div>
      <MapContainer data={data} />
    </>
  );
}

export default Home;
