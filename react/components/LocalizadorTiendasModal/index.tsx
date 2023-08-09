import React, { useContext } from 'react';
import { useCssHandles } from 'vtex.css-handles';
import { Context } from '../ContextoGlobal';
import LocalizadorTiendasError from '../LocalizadorTiendasError';
import CiudadesDisponiblesModal from './CiudadesDisponiblesModal';
import TiendasDisponiblesModal from './TiendasDisponiblesModal';
import TiendaSeleccionadaModal from './TiendaSeleccionadaModal';
import './styles.css';

export const CSS_HANDLES = [
  'modal__localizador-tiendas--app-contenerdor',
  'modal__localizador-tiendas--selectores-contenedor',
  'selector-modal_contenedor-general',
  'selector-modal__ciudades',
  'selector-modal__tienda',
  'selector-modal__down-arrow',
  'tienda-seleccionada-modal__contenedor-general',
  'tienda-seleccionada-modal__titulo-contenedor',
  'tienda-seleccionada-modal__informacion-general',
  'tienda-seleccionada-modal__informacion-general--imagen',
  'tienda-seleccionada-modal__detalles-generales',
  'tienda-seleccionada-modal__detalles-generales--geolocalizacion',
  'detalles-generales-modal__geolocalizacion--app',
  'geolocalizacion-modal__app--waze',
  'tienda-seleccionada-modal__detalles-generales--datos'
]


export default function LocalizadorTiendasModal() {

  //ESTADO GLOBAL
  const estadoGlobal = useContext(Context);

  //CSS HANDLES
  const handles = useCssHandles(CSS_HANDLES);

  //JSX
  return (
    <div className={`${handles['modal__localizador-tiendas--app-contenerdor']}`}>
      <div className={`${handles['modal__localizador-tiendas--selectores-contenedor']}`}>
        <CiudadesDisponiblesModal />
        <TiendasDisponiblesModal />
      </div>
      {
        estadoGlobal?.tiendaSeleccionada
        ?
          <TiendaSeleccionadaModal />
        :
          null
      }
      {/* <ListaTiendasMobile /> */}
      {
        estadoGlobal?.fetchError &&
        <LocalizadorTiendasError />
      }
    </div>
  )
}
