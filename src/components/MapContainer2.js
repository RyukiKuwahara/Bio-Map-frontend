import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import PostForm from './PostForm';
import PopMessage from './PopMessage'


const MapContainer2 = (props) => {

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  var locations;

  if (props.data === "") {
    locations = [];
  } else {
    locations = props.data;
  }

  const [selected, setSelected] = useState({});
  const [rightClickPosition, setRightClickPosition] = useState({lat : 35.4123, lng : 139.4132});
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    comment: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);


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
          setErrorMessage(error.response.data)

        }
      };

      reader.readAsDataURL(selectedImage);
    }

    setFormVisible(false);
  };

  return (
    <>
      {errorMessage !== null ? <PopMessage message={errorMessage}  onClose={() => setErrorMessage(null)}/> : null}
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={8}
        center={rightClickPosition}
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
            <PostForm
              onFormSubmit={handleFormSubmit}
              onImageChange={handleImageChange}
              onFormChange={handleFormChange}
              onImageDrop={handleImageDragOver}
              formData={formData}
            />
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  );
};

export default MapContainer2;
