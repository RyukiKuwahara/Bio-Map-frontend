import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageGallery from '../components/ImageGallery';
import BadgeGallery from '../components/BadgeGallery';
import { Link } from 'react-router-dom';
import './Home.css';
import './MyPage.css';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function MyPage() {
  const [userData, setUserData] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json'
        };
        const response = await axios.post(`${apiUrl}/mypage`, { "SessionId" : getCookie("session_id") }, { headers });
        setUserData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [apiUrl]);

  if (userData === null) {
    return (
      <>
        <div className="header">
          <div className='title'>BIO-MAP</div>
          <Link to="/main-service" className="login-button">戻る</Link>
        </div>
        <div>Loading...</div>
      </>
    );
  }

  return (
    <div>
      <div className="header">
        <div className='title'>BIO-MAP</div>
        <p>{userData.name}さんのマイページ</p>
        <Link to="/main-service" className="login-button">戻る</Link>
      </div>
      <div className='body'>
        <div className="sub-title">
          <h3>バッジギャラリー</h3>
          <Link
            to='/badge-condition' state={{badges: userData.badges}}>
            <p>バッジ獲得条件</p>
          </Link>
        </div>
       <BadgeGallery badges={userData.badges} />
       <h3 className="sub-title">ポストギャラリー</h3>
       <ImageGallery posts={userData.posts} />
      </div>
    </div>
  );
}

export default MyPage;
