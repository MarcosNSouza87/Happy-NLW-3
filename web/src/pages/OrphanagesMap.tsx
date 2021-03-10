import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FiPlus,FiArrowRight } from "react-icons/fi";
import { MapContainer as Map, Marker, Popup, TileLayer } from "react-leaflet";

import mapMarkerImg from "../Images/mapMarker.svg";
import mapIcon from '../components/Map/happMapIcon';

import '../styles/pages/orphanages-map.css'

import api from '../services/api';

interface Orphanage{
    id:String;
    name:String;
    latitude:String;
    longitude:String;
}

const OrphanagesMap:React.FC = () => {
    
    const [position,setPosition] = useState({   latitude:1,    longitude:1, });
    const [orphanage,setOrphanage] = useState<Orphanage[]>([]);
    
    const getPosition = async() => {
        await navigator.geolocation.getCurrentPosition(
            position => setPosition({
                latitude:position.coords.latitude,
                longitude:position.coords.longitude,
            })
        )
    }
    useEffect( ()=> {
        getPosition();
        let body = {    query:'query{ Orphanages{  id,name,latitude,longitude } }'}
        /* let body = {
            query:`mutation{
                createOrphanage(data:{ name:"ONG UNICOLES CRIS", latitude:"-23.9416024", longitude:"-46.4136614",
                 about:"ONG UNICOLES CRIS", whatsapp:"13987654321", instructions:"sem instruções"
                  open_on_weekends:"no"   }){       id     name   } }`}*/
        let options = {    headers: {    'Content-Type': 'application/json'    }    }
       // console.log(position);
        api.post('',body,options).then((response)=>{
            setOrphanage(response.data.data.Orphanages)
            //console.log(response.status)
        }).catch((response)=>{console.log(response.status)})
    },[position])
    
   // console.log(list);

    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="map marker"/>
                    <h2>Escolha um orfanato</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Rio do Sul</strong>
                    <span>Santa Catarina</span>
                </footer>
            </aside>
            {position.latitude !== 1 &&
                <Map
                center={[position.latitude,position.longitude]}
                zoom={15}
                style={{width:'100%',height:'100%'}}
                >
                    <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    
                    {orphanage.map((orphanage,index)=>{
                        return(
                            <Marker
                                key={index} icon={mapIcon}
                                position={[Number(orphanage.latitude),Number(orphanage.longitude)]}
                            >
                                <Popup     className="map-popup"    closeButton={false}    minWidth={240}    maxWidth={240}
                                >
                                    {orphanage.name}
                                    <Link to={`/orphanages/${orphanage.id}`}>
                                        <FiArrowRight size={20} color="#fff"/>
                                    </Link>
                                </Popup>
                            </Marker>
                        )
                    })}
                </Map>
            }
            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#fff"/>
            </Link>
        </div>
    )
}
export default OrphanagesMap;