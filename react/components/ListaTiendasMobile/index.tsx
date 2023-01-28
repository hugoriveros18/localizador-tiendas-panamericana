import React, { useContext } from "react";
import { Context } from "../ContextoGlobal";
import GoogleMapsLogo from '../../assets/google-maps-logo.png';
import WazeLogo from '../../assets/waze-logo.png';
import { useCssHandles } from 'vtex.css-handles';
import { CSS_HANDLES } from "../cssHandles";
import '../TiendaSeleccionada/styles.css';
import { horarioFormateado, numeroTelefonicoFormateado } from "../informacionGeneralLanding";

const ListaTiendasMobile = () => {

  //ESTADO GLOBAL
  const estadoGlobal = useContext(Context);

  //CSS HANDLES
  const handles = useCssHandles(CSS_HANDLES);

  //METODOS
  const verMenosTiendas = () => {
    estadoGlobal?.setVerTodasLasTiendasMobile(null);
    window.scrollTo({
      top: 25,
      behavior: 'smooth'
    });
  }

  return (
    <>
      {
        estadoGlobal?.verTodasLasTiendasMobile !== null &&
        estadoGlobal?.verTodasLasTiendasMobile.map((tienda, index) => {
          return (
            <div
              className={`${handles['tienda-seleccionada__contenedor-general']} ${estadoGlobal.verTodasLasTiendasMobile && handles['tiendas-seleccionadas__ver-todas']}`}
              key={index}
            >
              <div className={`${handles['tienda-seleccionada__titulo-contenedor']}`}>
                <h2>{tienda.nombre}</h2>
              </div>

              <div className={`${handles['tienda-seleccionada__informacion-general']}`}>
                <div className={`${handles['tienda-seleccionada__informacion-general--imagen']}`}>
                  <img src={tienda.imagenTienda} alt={tienda.nombre} />
                </div>

                <div className={`${handles['tienda-seleccionada__detalles-generales']}`}>
                  <div className={`${handles['tienda-seleccionada__detalles-generales--geolocalizacion']}`}>
                    <a
                      className={`${handles['detalles-generales__geolocalizacion--app']}`}
                      href={`${tienda.linkGoogleMaps}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img alt="Google Maps Logo" src={GoogleMapsLogo} />
                    </a>
                    <a
                      className={`${handles['detalles-generales__geolocalizacion--app']}`}
                      href={`${tienda.linkWaze}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img className={`${handles['geolocalizacion__app--waze']}`} alt="Waze Logo" src={WazeLogo} />
                    </a>
                  </div>
                  <div className={`${handles['tienda-seleccionada__detalles-generales--datos']}`}>
                    <p>Dirección: {tienda.direccion}</p>
                    <p>Teléfono: {numeroTelefonicoFormateado(tienda.PBX,tienda.indicativoCiudad)}{tienda.lineaDirecta ? ` - ${numeroTelefonicoFormateado(tienda.lineaDirecta,tienda.indicativoCiudad)}` : ''}</p>
                    {horarioFormateado()}
                    <p>Parqueadero: {tienda.parqueadero ? 'Sí' : 'No'}</p>
                    {
                      tienda.domicilios !== null &&
                      <p>Domicilios: {numeroTelefonicoFormateado(tienda.domicilios,tienda.indicativoCiudad)}</p>
                    }
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }
      {
        estadoGlobal?.verTodasLasTiendasMobile !== null &&
        <div className={`${handles['tienda-seleccionada__ver-mas--contenedor-externo']}`}>
          <div className={`${handles['tienda-seleccionada__ver-mas--contenedor-interno']}`}>
            <button
              className={`${handles['tienda-seleccionada__ver-mas--boton']}`}
              onClick={verMenosTiendas}
            >
              Ver menos
            </button>
          </div>
        </div>
      }
    </>
  )
}

export default ListaTiendasMobile;
