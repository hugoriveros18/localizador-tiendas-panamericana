import React, { useContext, useEffect } from "react";
import { Context } from "../ContextoGlobal";
import { useCssHandles } from 'vtex.css-handles';
import './styles.css';
import CiudadesDisponibles from "../CiudadesDisponibles";
import { useDevice } from 'vtex.device-detector';
import TiendasDisponibles from "../TiendasDisponibles";
import TiendaSeleccionada from "../TiendaSeleccionada";
import { CSS_HANDLES } from "../cssHandles";

const LocalizadorTiendasDesktop = () => {

  //DISPOSITIVO
  const { isMobile } = useDevice()

  //ESTADO GLOBAL
  const estadoGlobal = useContext(Context);

  //CSS HANDLES
  const handles = useCssHandles(CSS_HANDLES);

  //EFECTOS
  useEffect(() => {
      if(!isMobile) {
        estadoGlobal?.setCiudadSeleccionada('Bogotá');
      }
  },[])

  //JSX
  return (
      <div className={`${handles['desktop__localizador-tiendas']}`}>
          <div
              className={`
                  ${handles['desktop__localizador-tiendas--contenedor-general']}
                  ${estadoGlobal?.tiendaSeleccionada !== null && handles['desktop__localizador-tiendas--transition']}
              `}
          >
              <div className={`${handles['desktop__localizador-tiendas--seccion-ciudades']}`}>
                  <CiudadesDisponibles/>
              </div>
              <div className={`${handles['desktop__localizador-tiendas--seccion-tiendas']}`}>
                  <TiendasDisponibles/>
              </div>
          </div>
          <div
              className={`
                  ${handles['desktop__localizador-tiendas--contenedor-seleccionada']}
                  ${estadoGlobal?.tiendaSeleccionada !== null && handles['desktop__localizador-tiendas--transition']}
              `}
          >
              <div className={`${handles['localizador-tiendas--seleccionada-ciudad']}`}>
                  <p>TIENDAS EN {estadoGlobal?.ciudadSeleccionada}</p>
              </div>
              <TiendaSeleccionada/>
          </div>
      </div>
  )
}

export default LocalizadorTiendasDesktop;
