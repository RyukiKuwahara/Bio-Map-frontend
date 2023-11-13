import React from 'react';
import "./PopMessage.css"

function PopMessage({ message, badgeImg, onClose }) {

  const displayMessage = badgeImg ? (
    <div>
      <p>{message}</p>
      <p>！！！新しいバッジを獲得しました！！！</p>
      <img src={`data:image/jpg;base64,${badgeImg}`} alt="Badge" />
    </div>
  ) : (
    <p>{message}</p>
  );

  return (
    <div className="pop-message-container">
      <button className="close-button" onClick={onClose}>X</button>
      <div className="pop-message-box">
        {displayMessage}
      </div>
    </div>
  );
}

export default PopMessage;
