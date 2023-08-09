import React, { useContext } from "react";
import { Context } from "../ContextoGlobal";
import { useCssHandles } from 'vtex.css-handles';
import { horarioFormateado, numeroTelefonicoFormateado } from "../informacionGeneralLanding";
import WazeLogo from '../../assets/waze-logo.png';
import GoogleMapsLogo from '../../assets/google-maps-logo.png';
import { CSS_HANDLES } from "./index";
import './styles.css';


export default function TiendaSeleccionadaModal() {

  //ESTADO GLOBAL
  const estadoGlobal = useContext(Context);

  //CSS HANDLES
  const handles = useCssHandles(CSS_HANDLES);

  //JSX
  return (
    <div
        className={`${handles['tienda-seleccionada-modal__contenedor-general']}`}
    >
      <div className={`${handles['tienda-seleccionada-modal__titulo-contenedor']}`}>
          <h2>{estadoGlobal?.tiendaSeleccionada?.nombre}</h2>
      </div>

      <div className={`${handles['tienda-seleccionada-modal__informacion-general']}`}>
          <div className={`${handles['tienda-seleccionada-modal__informacion-general--imagen']}`}>
              <img src={estadoGlobal?.tiendaSeleccionada?.imagenTienda} alt={estadoGlobal?.tiendaSeleccionada?.nombre}/>
          </div>

          <div className={`${handles['tienda-seleccionada-modal__detalles-generales']}`}>
              <div className={`${handles['tienda-seleccionada-modal__detalles-generales--geolocalizacion']}`}>
                  <a
                      className={`${handles['detalles-generales-modal__geolocalizacion--app']}`}
                      href={`${estadoGlobal?.tiendaSeleccionada?.linkGoogleMaps}`}
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                      <img alt="Google Maps Logo" src={GoogleMapsLogo}/>
                  </a>
                  <a
                      className={`${handles['detalles-generales-modal__geolocalizacion--app']}`}
                      href={`${estadoGlobal?.tiendaSeleccionada?.linkWaze}`}
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                      <img className={`${handles['geolocalizacion-modal__app--waze']}`} alt="Waze Logo" src={WazeLogo}/>
                  </a>
              </div>
              <div className={`${handles['tienda-seleccionada-modal__detalles-generales--datos']}`}>
                  <p>Dirección: {estadoGlobal?.tiendaSeleccionada?.direccion}</p>
                  <p>Teléfono: {numeroTelefonicoFormateado(estadoGlobal?.tiendaSeleccionada?.PBX,estadoGlobal?.tiendaSeleccionada?.indicativoCiudad)}{estadoGlobal?.tiendaSeleccionada?.lineaDirecta ? ` - ${numeroTelefonicoFormateado(estadoGlobal.tiendaSeleccionada.lineaDirecta,estadoGlobal?.tiendaSeleccionada?.indicativoCiudad)}` : ''}</p>
                  {horarioFormateado()}
                  <p>Parqueadero: {estadoGlobal?.tiendaSeleccionada?.parqueadero ? 'Sí' : 'No'}</p>
                  {
                    estadoGlobal?.tiendaSeleccionada?.domicilios !== null &&
                      <p>Domicilios: {numeroTelefonicoFormateado(estadoGlobal?.tiendaSeleccionada?.domicilios, estadoGlobal?.tiendaSeleccionada?.indicativoCiudad)}</p>
                  }
              </div>
          </div>
      </div>
    </div>
  )
}


