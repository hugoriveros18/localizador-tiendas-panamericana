import React, { useContext } from 'react';
import { Context } from '../ContextoGlobal';
import { useCssHandles } from 'vtex.css-handles';
import { CSS_HANDLES } from './index';
import './styles.css';


export default function TiendasDisponiblesModal() {

  //ESTADO GLOBAL
  const estadoGlobal = useContext(Context);

  //CSS HANDLES
  const handles = useCssHandles(CSS_HANDLES);

  //METHODS
  const seleccionarNuevaTienda = (e:any) => {
      if(e.target.value === '') {
          estadoGlobal?.setTiendaSeleccionada(null);
          return;
      }
      const tiendaSeleccionada = estadoGlobal?.listaTiendas.find((tienda) => tienda.nombre === e.target.value);
      if(tiendaSeleccionada !== undefined) {
          estadoGlobal?.setTiendaSeleccionada(tiendaSeleccionada)
      }
      estadoGlobal?.setVerTodasLasTiendasMobile(null);
  }

  //JSX
  return(
    <div className={`${handles['selector-modal_contenedor-general']}`}>
        <select className={`${handles['selector-modal__tienda']}`} onChange={seleccionarNuevaTienda}>
            <option selected value="">-Seleccione una tienda-</option>
            {
                estadoGlobal?.listaTiendas?.map((tienda,index) => {
                    return (
                        <option key={index} value={tienda.nombre}>
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
        <div className={`${handles['selector-modal__down-arrow']}`}>
            <img alt="arrow" src='https://panamericana.vteximg.com.br/arquivos/form-arrow-contacto-two.svg'/>
        </div>
    </div>
  )
}
