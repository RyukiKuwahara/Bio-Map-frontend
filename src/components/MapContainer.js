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
        post_id: 123,
        name: "カブトムシ",
        lat: 35.4123,
        lng: 135.4132,
        explain: "カブトムシ取りに行った際に撮影しました"
        
      },
      {
        post_id: 234,
        name: "クワガタ",
        lat: 36.4233,
        lng: 139.4242,
        explain: "カブトムシ取りに行った際に撮影しました"
      }
    ];
  } else {
    locations = props.data;
  }

  console.log("location", locations)


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
                <MarkerF key={item.post_id}
                position={{lat: item.lat, lng: item.lng}}
                onClick={() => onSelect(item)}
                />
                )
              })
          }
          {
            selected.lat && selected.lng && 
            (
              <InfoWindow
              position={{lat: selected.lat, lng: selected.lng}}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <div>
                <h2>{selected.name}</h2>
                <img src="sample.jpg" alt="logo"></img>
                <p>{selected.explain}</p>
                <p>{selected.lat}</p>
                <p>{selected.lng}</p>
              </div>
            </InfoWindow>
            )
         }
         </GoogleMap>
     </LoadScript>
  )
}
export default MapContainer;