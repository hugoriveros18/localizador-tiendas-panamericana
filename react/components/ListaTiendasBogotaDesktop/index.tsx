import React, { useContext, useMemo } from 'react';
import UbicacionTiendaBogota from './UbicacionTiendaBogota';
import { useCssHandles } from 'vtex.css-handles';
import { CSS_HANDLES } from '../cssHandles';
import { Context } from '../ContextoGlobal';
import { horarioCiudadesFormateado, numeroTelefonicoFormateado } from '../informacionGeneralLanding';
import { TiendaSeleccionada } from '../types';
import GoogleMapsLogo from '../../assets/google-maps-logo.png';
import './styles.css';
import '../ListaTiendasCiudadesDesktop/styles.css';

const ListaTiendasBogotaDesktop = () => {

  //CSS HANDLES
  const handles = useCssHandles(CSS_HANDLES);

  //JSX
  return(
      <div className={`${handles['desktop__tiendas-bogota--contenedor-general']}`}>
          <TiendaBogotaNueva/>
          <UbicacionTiendaBogota ubicacionTienda="Ver Todas"/>
          <UbicacionTiendaBogota ubicacionTienda="Norte"/>
          <UbicacionTiendaBogota ubicacionTienda="Sur"/>
          <UbicacionTiendaBogota ubicacionTienda="Occidente"/>
      </div>
  )
}

function TiendaBogotaNueva() {

  //CSS HANDLES
  const handles = useCssHandles(CSS_HANDLES);

  //ESTADO GLOBAL
  const estadoGlobal = useContext(Context);

  //MEMO
  const tiendasNuevas = useMemo(() => {
    const tiendasDisponiblesNuevas = estadoGlobal?.listaTiendas.filter(tienda => tienda.flagActivo);
    return tiendasDisponiblesNuevas
  },[estadoGlobal?.listaTiendas])

  //METODOS
  const seleccionarNuevaTienda = (tienda: TiendaSeleccionada) => {
    estadoGlobal?.setTiendaSeleccionada(tienda);
    window.scrollTo(0,0);
  }

  //JSX
  if(tiendasNuevas && tiendasNuevas.length > 0) {
    return (
      <div className={`${handles['tiendasNuevasBogota__container']}`}>
        {
          tiendasNuevas.map((tienda, index) => {
            return (
              <div key={index} className={`${handles['tiendas-ciudad__informacion-general--contenedor']}`}>
                <div className={`${handles['tiendas-ciudad__informacion-general']}`}>
                  <div className={`${handles['tiendas-ciudad__titulo-contenerdor']}`}>
                    {
                      tienda.flagActivo
                      ?
                        <p className={`${handles['tiendaCiudadDesktop__flag']}`}>{tienda.textoFlag}</p>
                      :
                        null
                    }
                    <h3>
                      {
                        tienda.nombre.toLowerCase().includes('centro comercial')
                        ? tienda.nombre.toLowerCase().replace('centro comercial', 'C.C.')
                          : tienda.nombre
                      }
                    </h3>
                  </div>
                  <p>Dirección: {tienda.direccion}</p>
                  <p>
                    Teléfono: {numeroTelefonicoFormateado(tienda.PBX,tienda.indicativoCiudad)}{tienda.lineaDirecta ? ` - ${numeroTelefonicoFormateado(tienda.lineaDirecta,tienda.indicativoCiudad)}` : ''}
                  </p>
                  {horarioCiudadesFormateado(tienda.horarioLunesViernes, tienda.horarioSabado, tienda.horarioDomingoFestivo)}
                  <div className={`${handles['tiendas-ciudad__informacion-botones']}`}>
                    <a
                      href={`${tienda.linkGoogleMaps}`}
                      className={`${handles['tiendas-ciudad__informacion-botones--google-maps']}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img alt="Google Maps Logo" src={GoogleMapsLogo} />
                    </a>
                    <button
                      className={`${handles['tiendas-ciudad__informacion-botones--ver-mas']}`}
                      onClick={() => seleccionarNuevaTienda(tienda)}
                    >
                      VER MÁS
                    </button>
                  </div>
                </div>
                <div className={`${handles['tiendas-ciudad__contenedor-imagen']}`}>
                  <img alt={`${tienda.nombre}`} src={tienda.imagenTienda} />
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

  return null;
}

export default ListaTiendasBogotaDesktop;
