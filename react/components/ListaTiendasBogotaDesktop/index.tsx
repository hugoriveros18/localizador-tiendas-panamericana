import React from 'react';
import UbicacionTiendaBogota from './UbicacionTiendaBogota';
import { useCssHandles } from 'vtex.css-handles';
import './styles.css';
import { CSS_HANDLES } from '../cssHandles';

const ListaTiendasBogotaDesktop = () => {

  //CSS HANDLES
  const handles = useCssHandles(CSS_HANDLES);

  //JSX
  return(
      <div className={`${handles['desktop__tiendas-bogota--contenedor-general']}`}>
          <UbicacionTiendaBogota ubicacionTienda="Norte"/>
          <UbicacionTiendaBogota ubicacionTienda="Sur"/>
          <UbicacionTiendaBogota ubicacionTienda="Occidente"/>
          <UbicacionTiendaBogota ubicacionTienda="Ver Todas"/>
      </div>
  )
}

export default ListaTiendasBogotaDesktop;
