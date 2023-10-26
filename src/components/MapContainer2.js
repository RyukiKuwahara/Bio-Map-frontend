import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './MapContainer2.css';
import axios from 'axios';


const MapContainer2 = (props) => {

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 35.4123,
    lng: 139.4132,
  };

  var locations;

  if (props.data === "") {
    locations = [];
  } else {
    locations = props.data;
  }

  const [selected, setSelected] = useState({});
  const [rightClickPosition, setRightClickPosition] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    comment: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const onSelect = (item) => {
    setSelected(item);
  };

  const handleRightClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setRightClickPosition({ lat, lng });
    setFormVisible(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleImageDragOver = (e) => {
    e.preventDefault();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleFormSubmit = async () => {

    if (selectedImage) {
      
      const reader = new FileReader();
  
      reader.onload = async (event) => {
        const base64Image = event.target.result;
        const {lat, lng} = rightClickPosition;
          
        const postData = {
          SessionId: props.sessionId,
          SpeciesName: formData.name,
          ImageData: base64Image, 
          Explain: formData.comment,
          Lat: lat,
          Lng: lng
        };

        try {
          const headers = {
            'Content-Type': 'application/json'
          };
          const apiUrl = process.env.REACT_APP_API_URL;
          console.log(`${apiUrl}/post`);
          const response = await axios.post(`${apiUrl}/post`, postData, { headers });
          console.log('POSTリクエストの結果:', response.data);
        } catch (error) {
          console.error('POSTリクエストエラー:', error);
        }
      };

      reader.readAsDataURL(selectedImage);
    }

    setFormVisible(false);
  };

  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={8}
        center={defaultCenter}
        onRightClick={handleRightClick}
      >
        {locations.map((item) => {
          return (
            <Marker
              key={item.post_id}
              position={{ lat: item.lat, lng: item.lng }}
              onClick={() => onSelect(item)}
            />
          );
        })}
        {selected.lat && selected.lng && (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            clickable={true}
            onCloseClick={() => setSelected({})}
          >
            <div>
              <h2>{selected.name}</h2>
              <img src={`data:image/jpg;base64,${selected.image_data}`} alt="" />
              <p>{selected.explain}</p>
            </div>
          </InfoWindow>
        )}

        {rightClickPosition && formVisible && (
          <InfoWindow
            position={rightClickPosition}
            clickable={true}
            onCloseClick={() => setFormVisible(false)}
          >
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
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <label htmlFor="image">Image:</label>
                  <input
                    type="file" 
                    id="image"
                    name="image"
                    accept="image/*"
                    onDragOver={handleImageDragOver}
                    onDrop={handleImageDrop}
                    onChange={handleImageChange}
                  />
                </div>
                <div>
                  <label htmlFor="comment">Comment:</label>
                  <input
                    type="text"
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleFormChange}
                  />
                </div>
                <button type="button" onClick={handleFormSubmit}>
                  Submit
                </button>
              </form>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer2;
