import React, { useContext } from 'react';
import { Context } from '../ContextoGlobal';
import { useDevice } from 'vtex.device-detector';
import DownArrow from '../../assets/down-arrow-icon.png';
import { useCssHandles } from 'vtex.css-handles';
import ListaTiendasBogotaDesktop from '../ListaTiendasBogotaDesktop';
import ListaTiendasCiudadesDesktop from '../ListaTiendasCiudadesDesktop';
import { CSS_HANDLES } from '../cssHandles';
import './styles.css'

const TiendasDisponibles = () => {

  //DISPOSITIVO
  const { isMobile } = useDevice()

  //ESTADO GLOBAL
  const estadoGlobal = useContext(Context);

  //CSS HANDLES
  const handles = useCssHandles(CSS_HANDLES);

  //METHODS
  const seleccionarNuevaTienda = (e:any) => {
      if(e.target.value === '') {
          estadoGlobal?.setTiendaSeleccionada(null);
          estadoGlobal?.setVerTodasLasTiendasMobile(null);
          return;
      }
      const tiendaSeleccionada = estadoGlobal?.listaTiendas.find((tienda) => tienda.direccion === e.target.value);
      if(tiendaSeleccionada !== undefined) {
          estadoGlobal?.setTiendaSeleccionada(tiendaSeleccionada)
      }
      estadoGlobal?.setVerTodasLasTiendasMobile(null);
  }

  //JSX
  if(isMobile) {
    return(
      <div className={`${handles['selector-contenedor-general']}`}>
          <select className={`${handles['selector-tienda']}`} onChange={seleccionarNuevaTienda}>
              <option selected value="">
                  &nbsp;&nbsp;
                  -Seleccione una tienda-
              </option>
              {
                  estadoGlobal?.listaTiendas?.map((tienda, index) => {
                      return (
                          <option key={index} value={tienda.direccion}>
                              {
                                tienda.nombre.includes('Centro Comercial')
                                ? tienda.nombre.replace('Centro Comercial', 'C.C.')
                                : tienda.nombre
                              }
                          </option>
                      )
                  })
              }
          </select>
          <div className={`${handles['selector-down-arrow']}`}>
              <img alt="arrow" src={DownArrow}/>
          </div>
      </div>
    )
  }

  return(
    <div className={`${handles['desktop__lista-tiendas']}`}>
        <div className={`${handles['desktop__lista-tiendas--header']}`}>
            <h2 className={`${handles['desktop__lista-tiendas--header-titulo']}`}>
                NUESTRAS TIENDAS {estadoGlobal?.ciudadSeleccionada}
            </h2>
            <p className={`${handles['desktop__lista-tiendas--header-descripcion']}`}>
                Seleccione la tienda para ver la información
            </p>
        </div>
        {
            estadoGlobal?.ciudadSeleccionada === 'Bogotá' &&
            <ListaTiendasBogotaDesktop/>
        }
        {
            estadoGlobal?.ciudadSeleccionada !== 'Bogotá' &&
            <ListaTiendasCiudadesDesktop/>
        }
    </div>
)
}

export default TiendasDisponibles;
