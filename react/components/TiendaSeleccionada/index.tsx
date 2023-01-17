import React, { useContext } from "react";
import { Context } from "../ContextoGlobal";
import { CSSTransition } from "react-transition-group";
import GoogleMapsLogo from '../../assets/google-maps-logo.png';
import WazeLogo from '../../assets/waze-logo.png';
import { useCssHandles } from 'vtex.css-handles';
import { useDevice } from 'vtex.device-detector';
import './styles.css';
import { CSS_HANDLES } from "../cssHandles";
import { TiendaSeleccionada } from "../types";
import { horarioFormateado, numeroTelefonicoFormateado } from "../informacionGeneralLanding";


const TiendaSeleccionada = () => {

  //DISPOSITIVO
  const { isMobile } = useDevice()

  //ESTADO GLOBAL
  const estadoGlobal = useContext(Context);

  //CSS HANDLES
  const handles = useCssHandles(CSS_HANDLES);

  //METODOS
  const verTodosMobile = () => {
    if(estadoGlobal?.listaTiendas) {
      const VerTodasLasTiendasFiltradas:TiendaSeleccionada[] = estadoGlobal.listaTiendas.filter(tienda => tienda !== estadoGlobal.tiendaSeleccionada);
      estadoGlobal?.setVerTodasLasTiendasMobile(VerTodasLasTiendasFiltradas);
    }
  }
  const verTodosDesktop = () => {
      estadoGlobal?.setTiendaSeleccionada(null);
  }

  //JSX
  return (
      <CSSTransition
          in={estadoGlobal?.tiendaSeleccionada !== null}
          timeout={300}
          classNames={handles["tienda-seleccionada__transition"]}
      >
          <div
              className={`${handles['tienda-seleccionada__contenedor-general']}`}
          >
              <div className={`${handles['tienda-seleccionada__titulo-contenedor']}`}>
                  <h2>{estadoGlobal?.tiendaSeleccionada?.nombre}</h2>
              </div>

              <div className={`${handles['tienda-seleccionada__informacion-general']}`}>
                  <div className={`${handles['tienda-seleccionada__informacion-general--imagen']}`}>
                      <img src={estadoGlobal?.tiendaSeleccionada?.imagenTienda} alt={estadoGlobal?.tiendaSeleccionada?.nombre}/>
                  </div>

                  <div className={`${handles['tienda-seleccionada__detalles-generales']}`}>
                      <div className={`${handles['tienda-seleccionada__detalles-generales--geolocalizacion']}`}>
                          <a
                              className={`${handles['detalles-generales__geolocalizacion--app']}`}
                              href={`${estadoGlobal?.tiendaSeleccionada?.linkGoogleMaps}`}
                              target="_blank"
                              rel="noopener noreferrer"
                          >
                              <img alt="Google Maps Logo" src={GoogleMapsLogo}/>
                          </a>
                          <a
                              className={`${handles['detalles-generales__geolocalizacion--app']}`}
                              href={`${estadoGlobal?.tiendaSeleccionada?.linkWaze}`}
                              target="_blank"
                              rel="noopener noreferrer"
                          >
                              <img className={`${handles['geolocalizacion__app--waze']}`} alt="Waze Logo" src={WazeLogo}/>
                          </a>
                      </div>
                      <div className={`${handles['tienda-seleccionada__detalles-generales--datos']}`}>
                          <p>Dirección: {estadoGlobal?.tiendaSeleccionada?.direccion}</p>
                          <p>Teléfono: {numeroTelefonicoFormateado(estadoGlobal?.tiendaSeleccionada?.PBX)}</p>
                          {horarioFormateado()}
                          <p>Parqueadero: {estadoGlobal?.tiendaSeleccionada?.parqueadero ? 'Sí' : 'No'}</p>
                          {
                            estadoGlobal?.tiendaSeleccionada?.domicilios !== null &&
                              <p>Domicilios: {numeroTelefonicoFormateado(estadoGlobal?.tiendaSeleccionada?.domicilios)}</p>
                          }
                      </div>
                  </div>
              </div>
              {
                ((estadoGlobal?.verTodasLasTiendasMobile === null && (estadoGlobal?.setVerTodasLasTiendasMobile !== undefined && estadoGlobal?.listaTiendas.length > 1) ) || !isMobile) &&
                  <div className={`${handles['tienda-seleccionada__ver-mas--contenedor-externo']}`}>
                      <div className={`${handles['tienda-seleccionada__ver-mas--contenedor-interno']}`}>
                          <button
                              className={`${handles['tienda-seleccionada__ver-mas--boton']}`}
                              onClick={isMobile ? verTodosMobile : verTodosDesktop}
                          >
                              Ver todas las tiendas
                          </button>
                      </div>
                  </div>
              }
          </div>
      </CSSTransition>
  )
}

export default TiendaSeleccionada;
