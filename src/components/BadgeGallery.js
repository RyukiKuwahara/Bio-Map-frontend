import React from 'react';
import './BadgeGallery.css'

function BadgeGallery({ badges }) {
    return (
      <div className="badge-gallery">
        {badges.length > 0 ? (
          badges.map((badge, index) => (
            <div key={index} className="badge-item">
              <img src={`data:image/jpg;base64,${badge.image_data}`} alt="" />
            </div>
          ))
        ) : (
          <p>バッジはありません。</p>
        )}
      </div>
    );
  }
  

export default BadgeGallery;
