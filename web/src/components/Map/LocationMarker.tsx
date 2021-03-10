import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import mapIcon from "./happMapIcon";


const MarkerCustom = (props:any) => {
  const [ positionCustom, setPositionCustom ] = useState({ latitude:0, longitude: 0 })
  useMapEvents({
    click(event) {
        const { lat, lng } = event.latlng;
        setPositionCustom({
          latitude: lat,
          longitude: lng,
        });
        props.handlePosition(lat,lng);
    } 
  })

  return (
    positionCustom.latitude !== 0 ? 
      <Marker 
        position={[positionCustom.latitude, positionCustom.longitude]}
        interactive={false} 
        icon={mapIcon} 
      />
      :
      null
  ) 
}

const LocationMarker = (props:any) => {
  const [ position, setPosition ] = useState({ latitude: 0, longitude: 0 })
  const getPosition = () => {
       navigator.geolocation.getCurrentPosition(
          position => setPosition({
              latitude:position.coords.latitude,
              longitude:position.coords.longitude,
          })
      )
  }
  useEffect( ()=>{
      getPosition();
      console.log(position)
   },[position])
   
   return (
    <>
    {
      position.latitude !== 0 && position.longitude !== 0 &&
      <MapContainer               
      center={[position.latitude, position.longitude]}
      zoom={15}
      style={{ width: '100%', height: 280 }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <MarkerCustom handlePosition={props.handlePosition}/>
      </MapContainer>
      }
    
    </>
    )
}

export default LocationMarker;