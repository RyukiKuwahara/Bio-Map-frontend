import React from 'react';
import './BadgeGallery.css'

function BadgeGallery({ badges }) {
  return (
    <div className="badge-gallery">
      {badges.map((badge, index) => (
        <div key={index} className="badge-item">
          <img src={`data:image/jpg;base64,${badge.image_data}`} alt="" />
        </div>
      ))}
    </div>
  );
}

export default BadgeGallery;
