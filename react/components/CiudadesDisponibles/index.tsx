import React, { useContext, useEffect, useState } from "react";
import { Context } from "../ContextoGlobal";
import { useCssHandles } from 'vtex.css-handles';
import { ciudadesPanamericana } from "../informacionGeneralLanding";
import { useDevice } from 'vtex.device-detector';
import DownArrow from '../../assets/down-arrow-icon.png';
import './styles.css';
import { CSS_HANDLES } from "../cssHandles";
import { TiendaSeleccionada } from "../types";

const CiudadesDisponibles = () => {

  //DISPOSITIVO
  const { isMobile } = useDevice()

  //ESTADO GLOBAL
  const estadoGlobal = useContext(Context);

  //ESTADOS
  const [ciudadSeleccionadaLocal, setCiudadSeleccionadaLocal] = useState<string>('')

  //EFECTOS
  useEffect(() => {
    if(estadoGlobal?.ciudadSeleccionada !== '') {
      fetch(
        `/api/dataentities/LP/search?_fields=ciudad,nombre,direccion,horarioLunesViernes,horarioSabado,horarioDomingoFestivo,indicativoCiudad,PBX,lineaDirecta,domicilios,parqueadero,imagenTienda,linkGoogleMaps,linkWaze,ubicacionGeografica,flagActivo,textoFlag&_where=ciudad=${estadoGlobal?.ciudadSeleccionada.replace(" ","")}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/vnd.vtex.ds.v10+json",
                "REST-Range": "resources=0-30"
            }
        }
      )
      .then((res) => {
        if(res.ok) {
          return res.json()
        }
        throw new Error()
      })
      .then((res:TiendaSeleccionada[]) => {
        res.sort((tienda1:TiendaSeleccionada,tienda2:TiendaSeleccionada) => {
          if(tienda1.nombre < tienda2.nombre) {
            return -1;
          }

          if(tienda1.nombre > tienda2.nombre) {
            return 1;
          }

          return 0;
        })
        res.forEach((tienda, index) => {
          if(tienda.flagActivo) {
            res.splice(index, 1);
            res.unshift(tienda);
          }
        })
        estadoGlobal?.setListaTiendas(res);
      })
      .catch(() => {
        estadoGlobal?.setFetchError(true)
      });
    }
  },[estadoGlobal?.ciudadSeleccionada,ciudadSeleccionadaLocal])

  //CSS HANDLES
  const handles = useCssHandles(CSS_HANDLES);

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
  if(isMobile) {
    return(
        <div className={`${handles['selector-contenedor-general']}`}>
            <select className={`${handles['selector-ciudades']}`} onChange={seleccionarNuevaCiudad}>
                <option selected value="">-Seleccione una ciudad-</option>
                {ciudadesPanamericana?.map((ciudad,index) => {
                    return (
                        <option key={index} value={ciudad}>
                            {ciudad}
                        </option>
                    )
                })}
            </select>
            <div className={`${handles['selector-down-arrow']}`}>
                <img alt="arrow" src={DownArrow}/>
            </div>
        </div>
    )
  }

  return (
    <div className={`${handles['desktop__lista-ciudades']}`}>
        <table className={`${handles['desktop__lista-ciudades--table']}`}>
            <tbody>
                {
                    ciudadesPanamericana?.map((ciudad,index) => {
                        return(
                            <tr key={index}>
                                <td
                                    className={`${handles['desktop__lista-ciudades--table-row']} ${estadoGlobal?.ciudadSeleccionada === ciudad && handles['ciudad-seleccionada']}`}
                                    onClick={() => seleccionarNuevaCiudad(ciudad)}
                                >
                                    {ciudad}
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default CiudadesDisponibles;
