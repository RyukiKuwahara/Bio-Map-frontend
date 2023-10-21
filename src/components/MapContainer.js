import React, { useState } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindow} from '@react-google-maps/api';
const MapContainer = () => {
  
  const mapStyles = {        
    height: "100vh",
    width: "100%"};
  
  const defaultCenter = {
    lat: 35.4123, lng: 139.4132
  }

  const locations = [
    {
      name: "Location 1",
      location: { 
        lat: 35.4123,
        lng: 139.4132 
      },
      
    },
    {
      name: "Location 2",
      location: { 
        lat: 35.4134,
        lng: 139.4143 
      },
      
    }
  ];

  const [ selected, setSelected ] = useState({});
  
  const onSelect = item => {
    setSelected(item);
  }

  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  
  return (
     <LoadScript
       googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={18}
          center={defaultCenter}
        >
          {
              locations.map(item => {
                return (
                <MarkerF key={item.name}
                position={item.location}
                onClick={() => onSelect(item)}
                />
                )
              })
          }
          {
            selected.location && 
            (
              <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <div>
                <p>{selected.name}</p>
                <p>{"hello"}</p>
                <img src="logo512.png" alt="logo"></img>
              </div>
            </InfoWindow>
            )
         }
         </GoogleMap>
     </LoadScript>
  )
}
export default MapContainer;