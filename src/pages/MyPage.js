import React, { useState, useEffect } from 'react';
import axios from 'axios';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function MyPage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/mypage', { "session_id" : getCookie("session_id") });
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (userData === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {userData.name}</h1>
    </div>
  );
}

export default MyPage;
