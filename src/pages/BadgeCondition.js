import React from 'react';
import { useLocation } from 'react-router-dom';

function BadgeCondition() {
  const location = useLocation();
  
  const badges = location.state?.badges || [];
  console.log(badges)

  return (
    <div>
      <h1>New Page</h1>
      <h3>バッジ獲得条件</h3>
    </div>
  );
}

export default BadgeCondition;
