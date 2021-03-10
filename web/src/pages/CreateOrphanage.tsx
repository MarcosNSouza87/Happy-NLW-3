import React, { ChangeEvent, FormEvent, useState } from "react";

import PrimaryButton from "../components/PrimaryButton";
import Sidebar from "../components/Sidebar";

import '../styles/pages/CreateOrphanage.css';
import { FiPlus } from "react-icons/fi";

import MapMarkerCustom from "../components/Map/LocationMarker";
import { useHistory } from "react-router-dom";

interface OrphanageModal{
  name:String;
  latitude:String;
  longitude:String;
  whatsapp:String;
  about:String;
  instructions:String;
  opening_hours:String;
  open_on_weekends:String;

}

const CreateOrphanage:React.FC = () => {
  
  const [orphanage,setOrphanage] = useState<OrphanageModal>({
    name:'',
    latitude:'',
    longitude:'',
    about:'',
    whatsapp:'',
    instructions:'',
    opening_hours:'',
    open_on_weekends:''
  });
  
  const [openweek,setOpenweek] = useState('true'); 

  const [images,setImages] = useState<File[]>([])

  const [previewImages,setPreviewImages] = useState<string[]>([])



  const handlePosition = (lat:number,lng:number) => {
    console.log(orphanage?.latitude)
    let org = orphanage;
    if(org !== undefined)
    {
      org.latitude = String(lat);
      org.longitude = String(lng);
      setOrphanage(org);
    }
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const{name,value} = event.target;
    setOrphanage({...orphanage,[name]:value});
    console.log(orphanage)
  }
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const{name,value} = event.target;
    setOrphanage({...orphanage,[name]:value});
    console.log(orphanage)
  }
  const history = useHistory();
  const handleNewOW = (value:string) => {
    let org = orphanage;
    setOpenweek(value);
    org.open_on_weekends = value;
    setOrphanage(org);
    console.log(orphanage)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    const query = JSON.stringify({
      query:`
        mutation{
          createOrphanage(
            data:{
              name:"${orphanage.name}",
              latitude:"${orphanage.latitude}",
              longitude:"${orphanage.longitude}",
              about:"${orphanage.about}",
              whatsapp:"${orphanage.whatsapp}",
              instructions:"${orphanage.instructions}",
              opening_hours:"${orphanage.opening_hours}",
              open_on_weekends:"${orphanage.open_on_weekends}"
            })
            {
              id
              name
            }
        }
      `
    })
    const response = await fetch('http://localhost:4000/',{
      headers:{'content-type':'application/json'},
      method:'POST',
      body:query
    });
    const responseJson = await response.json();
    console.log(responseJson.data.createOrphanage);
    /*
    images.forEach(image =>{
      const query = JSON.stringify({
        query:`
          mutation{
            createImage(
              data:{
                path:"${image.name}",
                file:"${image}",
                orphanageid:"${"525b3d6e"}",
              })
              {
                id
                orphanageid
              }
          }
        `
      })

      const response = fetch('http://localhost:4000/',{
        headers:{'content-type':'application/json'},
        method:'POST',
        body:query
      })
      console.log(response);
    })
    */
    history.push('/app')
  }


  const handleSelectImages = (event:ChangeEvent<HTMLInputElement>) => {
    //console.log(event) PARA DESCOBRIR O QUE TEM NO EVENTO 
    console.log(event.target.files)
    if(!event.target.files){
      return;
    }
    const selectedImgs = Array.from(event.target.files);
    setImages(selectedImgs);
    const selectedImgPreview = selectedImgs.map(image => {
      return URL.createObjectURL(image);
    })
    setPreviewImages(selectedImgPreview)
    console.log(images);

  }



  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <MapMarkerCustom handlePosition={handlePosition}/>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input name="name" defaultValue={`${orphanage.name}`} onChange={handleInputChange}/>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre<span>Máximo de 300 caracteres</span></label>
              <textarea name="about" maxLength={300} defaultValue={`${orphanage.about}`} onChange={handleTextChange} />
            </div>

            <div className="input-block">
              <label htmlFor="name">Whatsapp</label>
              <input name="whatsapp" defaultValue={`${orphanage.whatsapp}`} onChange={handleInputChange}/>
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt="11" />
                  )
                })}
                <label htmlFor="image[]" className="new-image"  >
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input multiple onChange={handleSelectImages} type="file" id="image[]"/>

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea name="instructions" defaultValue={`${orphanage.instructions}`} onChange={handleTextChange} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horario de Visitação</label>
              <input name="opening_hours" defaultValue={`${orphanage.opening_hours}`} onChange={handleInputChange}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className={openweek === 'true'?'active':''}  onClick={()=>handleNewOW('true')}>Sim</button>
                <button type="button" className={openweek === 'false'?'active':''} onClick={()=>handleNewOW('false')}>Não</button>
              </div>
            </div>
          </fieldset>

          <PrimaryButton type="submit">Confirmar</PrimaryButton>
        </form>
      </main>
    </div>
  );
}
export default CreateOrphanage;
// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;