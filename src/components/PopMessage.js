import React from 'react';
import "./PopMessage.css"

function PopMessage({ message, onClose }) {
  return (
    <div className="pop-message-container">
      <button className="close-button" onClick={onClose}>X</button>
      <div className="pop-message-box">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default PopMessage;
