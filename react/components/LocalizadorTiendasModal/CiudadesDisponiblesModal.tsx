import React, { useContext, useEffect, useState } from "react";
import { useCssHandles } from 'vtex.css-handles';
import { Context } from "../ContextoGlobal";
import { ciudadesPanamericana } from "../informacionGeneralLanding";
import { CSS_HANDLES } from "./index";
import './styles.css';


export default function CiudadesDisponiblesModal() {

  //ESTADO GLOBAL
  const estadoGlobal = useContext(Context);

  //CSS HANDLES
  const handles = useCssHandles(CSS_HANDLES);

  //ESTADOS
  const [ciudadSeleccionadaLocal, setCiudadSeleccionadaLocal] = useState<string>('')

  //EFECTOS
  useEffect(() => {
    if(estadoGlobal?.ciudadSeleccionada !== '') {
      fetch(
        `/api/dataentities/LP/search?_fields=ciudad,nombre,direccion,horarioLunesViernes,horarioSabado,horarioDomingoFestivo,indicativoCiudad,PBX,lineaDirecta,domicilios,parqueadero,imagenTienda,linkGoogleMaps,linkWaze,ubicacionGeografica&_where=ciudad=${estadoGlobal?.ciudadSeleccionada.replace(" ","")}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/vnd.vtex.ds.v10+json",
                "REST-Range": "resources=0-20"
            }
        }
      )
      .then((res) => {
        if(res.ok) {
          return res.json()
        }
        throw new Error()
      })
      .then((res) => {
        estadoGlobal?.setListaTiendas(res);
      })
      .catch(() => {
        estadoGlobal?.setFetchError(true)
      });
    }
  },[estadoGlobal?.ciudadSeleccionada,ciudadSeleccionadaLocal])

  //METHODS
  const seleccionarNuevaCiudad = (e:any) => {
    if(e === estadoGlobal?.ciudadSeleccionada) {
      return
    }
    if(e.target === undefined) {
      estadoGlobal?.setCiudadSeleccionada(e);
    } else {
      setCiudadSeleccionadaLocal(e.target.value)
      estadoGlobal?.setCiudadSeleccionada(e.target.value);
    }
    estadoGlobal?.setListaTiendas([]);
    estadoGlobal?.setTiendaSeleccionada(null);
    estadoGlobal?.setVerTodasLasTiendasMobile(null);
  }

  //JSX
  return (
    <div className={`${handles['selector-modal_contenedor-general']}`}>
        <select className={`${handles['selector-modal__ciudades']}`} onChange={seleccionarNuevaCiudad}>
            <option selected value="">-Seleccione una ciudad-</option>
            {ciudadesPanamericana?.map((ciudad,index) => {
                return (
                    <option key={index} value={ciudad}>
                        {ciudad}
                    </option>
                )
            })}
        </select>
        <div className={`${handles['selector-modal__down-arrow']}`}>
            <img alt="arrow" src='https://panamericana.vteximg.com.br/arquivos/form-arrow-contacto-two.svg'/>
        </div>
    </div>
  )
}
