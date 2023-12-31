import React, { useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import MapContainer2 from '../components/MapContainer2';
import axios from 'axios';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function MainService() {
  const sessionId = getCookie('session_id')
  const apiUrl = process.env.REACT_APP_API_URL;
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [postsLength, setPostsLength] = useState(null);


  const handleSearch = async () => {
    const query = document.querySelector('.search-form input').value;

    const queryData = {
      "name": query,
    };

    setIsLoading(true);
  
    try {
      const headers = {
        'Content-Type': 'application/json'
      };
      console.log("call /search")
      const response = await axios.post(`${apiUrl}/search`, queryData, { headers });
      setPostsLength(response.data.length)
      setData(response.data)

      
    } catch (error) {
      console.error('エラー:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveSession = async () => {
    const queryData = {
      "sessionId": sessionId,
    };

    try {
      const headers = {
        'Content-Type': 'application/json'
      };
      console.log("call /logout")
      const response = await axios.post(`${apiUrl}/logout`, queryData, { headers });
      console.log(response.data)
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
          <button type="submit" onClick={handleSearch}>{isLoading ? "検索中..." : "検索"}</button>
        </div>
        <div>{postsLength === null ? "" : `検索結果は ${ postsLength } 件です`}</div>
        <div>
          <Link to="/mypage" className="login-button">マイページ</Link>
          <Link to="/" className="login-button" onClick={handleRemoveSession}>Logout</Link>
        </div>
      </div>
      <MapContainer2 data={data} sessionId={sessionId}/>
    </>
  );
}

export default MainService;
