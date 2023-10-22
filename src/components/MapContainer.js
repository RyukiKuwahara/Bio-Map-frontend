import React, { useState } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindow} from '@react-google-maps/api';
const MapContainer = (props) => {
  
  const mapStyles = {        
    height: "100vh",
    width: "100%"};
  
  const defaultCenter = {
    lat: 35.4123, lng: 139.4132
  }

  var locations;
  if (props.data === "") {
    locations = [
      {
        name: "カブトムシ",
        location: { 
          lat: 35.4123,
          lng: 139.4132 
        },
        explain: "カブトムシ取りに行った際に撮影しました"
        
      },
      {
        name: "クワガタ",
        location: { 
          lat: 35.4134,
          lng: 139.4143 
        },
        explain: "カブトムシ取りに行った際に撮影しました"
      }
    ];
  }


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
          zoom={8}
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
                <h2>{selected.name}</h2>
                <img src="sample.jpg" alt="logo"></img>
                <p>{selected.explain}</p>
              </div>
            </InfoWindow>
            )
         }
         </GoogleMap>
     </LoadScript>
  )
}
export default MapContainer;