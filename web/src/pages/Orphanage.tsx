import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Marker } from "react-leaflet";


import PrimaryButton from "../components/PrimaryButton";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";

import '../styles/pages/Orphanage.css';
import mapIcon from "../components/Map/happMapIcon";

import api from '../services/api';
import { useParams } from "react-router-dom";

interface OrphanageModal{
    id:String;
    name:String;
    latitude:String;
    longitude:String;
    about:String;
    instructions:String;
    opening_hours:String;
    open_on_weekends:String;
}
interface Images{
  id:String;
  path:String;
  file:String;
}

interface OrphanageParams {
  id:string;
}

const Orphanage:React.FC = () => {

  const [orphanage,setOrphanage] = useState<OrphanageModal>();
  const [images,setImages] = useState<Images[]>([]);
  const [activeImgIndex, setActiveImgIndex] =useState(0);


  const params = useParams<OrphanageParams>();



  useEffect( ()=> {
      let body = {    query:`query{ Orphanage(id:"${params.id}"){  name,latitude,longitude,about,instructions,opening_hours,open_on_weekends } }`}

      let options = {    headers: {    'Content-Type': 'application/json'    }    }

      api.post('',body,options).then((response)=>{
          //orphanage = response.data.data.Orphanage;
          setOrphanage(response.data.data.Orphanage)
          //console.log(response.data.data.Orphanage)
      }).catch((response)=>{console.log(response.status)})
      //console.log(orphanage)
     
        api.post('',{query:`query{ ImageByOrphanage(orphanageid:"${params?.id}"){ id, path, file }  }`},options)
            .then(response => {
              setImages(response.data.data.ImageByOrphanage)
              console.log(response.data)
            })
            .catch((response)=>{console.log(response.status)})
        
      
  },[params.id])

  
  return (
    <div id="page-orphanage">
      <Sidebar />
      {orphanage !== undefined && images !== undefined &&
        <main>
          <div className="orphanage-details">
            <img src={`${images[activeImgIndex]?.path}`} alt="Lar das meninas" />

            <div className="images">
              {
                images.map((image,index) => {
                return(
                  <button 
                  className={activeImgIndex === index ? 'active': ''}
                  type="button" 

                  key={`${image.id}`}
                    onClick={()=>{
                      setActiveImgIndex(index)
                    }}
                  >
                    <img src={`${image.path}`} alt="--" />
                  </button>
                )
              })}
              
            </div>
            
            <div className="orphanage-details-content">
              <h1>{orphanage?.name}</h1>
              <p>{orphanage?.about}</p>

              <div className="map-container">
                <Map 
                  interactive={false}
                  center={[Number(orphanage.latitude),Number(orphanage.longitude)]} 
                  zoom={16} 
                  style={{ width: '100%', height: 280 }}
                  >
                  <Marker interactive={false} icon={mapIcon} position={[Number(orphanage.latitude),Number(orphanage.longitude)]} />
                </Map>

                <footer>
                  <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
                </footer>
              </div>

              <hr />

              <h2>Instruções para visita</h2>
              <p>{orphanage.instructions}</p>

              <div className="open-details">
                <div className="hour">
                  <FiClock size={32} color="#15B6D6" />
                  Segunda à Sexta <br />
                  {orphanage.opening_hours}
                </div>
                {orphanage.open_on_weekends === "true"?
                (<div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>)
                :
                (<div className="open-on-weekends dont-open">
                    <FiInfo size={32} color="#FF669D" />
                    Não atendemos <br />
                    fim de semana
                  </div>)
                }
              </div>

              <PrimaryButton type="button">
                <FaWhatsapp size={20} color="#FFF" />
                Entrar em contato
              </PrimaryButton>
            </div>
          </div>
        </main>
      }
    </div>
  );
}
export default Orphanage