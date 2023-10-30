import React from 'react';
import './ImageGallery.css';

function ImageGallery({ posts }) {
  return (
    <>
    {posts.length > 0 ? (
      posts.map((post, index) => (
        <div className="image-gallery">
          <div key={index} className="image-item">
            <h2>{post.name}</h2>
            <p>緯度：{post.lat}, 経度：{post.lng}</p>
            <img src={`data:image/jpg;base64,${post.image_data}`} alt="" />
            <p>{post.explain}</p>
          </div>
        </div>
        ))
      ) : (
        <p className='none-post'>ポストがありません。</p>
      )}
    </>
  );
}


export default ImageGallery;
