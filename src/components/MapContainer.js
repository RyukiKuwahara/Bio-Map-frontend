import React, { useState } from 'react';
import { GoogleMap, MarkerF, InfoWindow} from '@react-google-maps/api';
const MapContainer = (props) => {
  
  const mapStyles = {        
    height: "100vh",
    width: "100%"};

  var locations;
  if (props.data === null) {
    locations = []
  } else {
    locations = props.data;
  }

  console.log("location", locations)


  const [ selected, setSelected ] = useState({});
  const [ position, setPosition ] = useState({lat: 35.4123 , lng: 139.4132});
  
  const onSelect = item => {
    setSelected(item);
    setPosition({lat: item.lat, lng: item.lng});
  }
  
  return (
    <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={8}
      center={position}
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
            <img src={`data:image/jpg;base64,${selected.image_data}`} alt=""/>
            <p>{selected.explain}</p>
          </div>
        </InfoWindow>
        )
      }
      </GoogleMap>
  )
}
export default MapContainer;