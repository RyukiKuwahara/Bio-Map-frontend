import React from 'react';
import './MapContainer2.css';

const PostForm = ({ onFormSubmit, onImageChange, onFormChange, onImageDrop, formData }) => {
  return (
    <div className="form-container">
      <h2>Enter Information</h2>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={onFormChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onDragOver={onImageDrop}
            onDrop={onImageDrop}
            onChange={onImageChange}
          />
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <input
            type="text"
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={onFormChange}
          />
        </div>
        <button type="button" onClick={onFormSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;
