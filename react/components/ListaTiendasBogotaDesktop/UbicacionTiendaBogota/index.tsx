import React, { useContext, useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useCssHandles } from 'vtex.css-handles';
import { Context } from '../../ContextoGlobal';
import { UbicacionTiendaBogotaProps, TiendaSeleccionada } from '../../types.d';
import IconClose from '../../../assets/plus-icon.svg';
import IconOpen from '../../../assets/minus-icon.svg';
import './style.css'
import { CSS_HANDLES } from '../../cssHandles';
import { numeroTelefonicoBogotaFormateado } from '../../informacionGeneralLanding';

const UbicacionTiendaBogota = ({ubicacionTienda}:UbicacionTiendaBogotaProps) => {

    //ESTADO GLOBAL
    const estadoGlobal = useContext(Context);

    //CSS HANDLES
    const handles = useCssHandles(CSS_HANDLES);

    //ESTADOS
    const [listaAbierta, setListaAbierta] = useState<boolean>(ubicacionTienda === 'Ver Todas');
    const [tiendasUbicacion, setTiendasUbicacion] = useState<TiendaSeleccionada[]>([]);

    //EFECTOS
    useEffect(() => {
        if(estadoGlobal?.ciudadSeleccionada === 'Bogotá') {
            if( ubicacionTienda !== "Ver Todas") {
                const tiendasUbicacionFiltradas = estadoGlobal?.listaTiendas?.filter(tienda => tienda.ubicacionGeografica === ubicacionTienda);
                setTiendasUbicacion(tiendasUbicacionFiltradas);
            } else {
                setTiendasUbicacion(estadoGlobal.listaTiendas);
            }
        }
        // eslint-disable-next-line
    },[estadoGlobal?.ciudadSeleccionada,estadoGlobal?.listaTiendas])

    //METODOS
    const nuevoEstadoDeLista = () => {
        setListaAbierta(!listaAbierta);
    }
    const seleccionarNuevaCiudad = (tienda:TiendaSeleccionada) => {
        estadoGlobal?.setTiendaSeleccionada(tienda);
        window.scrollTo(0,0);
    }

    //JSX
    return(
        <div
            className={`${handles['desktop__ubicacion-bogota--contenedor-general']}`}>
            <div
                className={`${handles['desktop__ubicacion-bogota--header']}`}
                onClick={nuevoEstadoDeLista}
            >
                <div className={`${handles['desktop__ubicacion-bogota--header-imagen']}`}>
                    <img alt='Icon' src={listaAbierta ? IconOpen : IconClose}/>
                </div>
                <div className={`${handles['desktop__ubicacion-bogota--header-titulo']}`}>
                    <h3 className={`${listaAbierta && handles['lista-abierta']}`}>{ubicacionTienda}</h3>
                </div>
            </div>
            <CSSTransition
                in={listaAbierta}
                timeout={200}
                classNames={handles["ubicacion-bogota__tabla--transition"]}
            >
                <table className={`${handles['desktop__ubicacion-bogota--tabla']} ${listaAbierta && handles['ubicacion-bogota__tabla--visible']}`}>
                    <tbody>
                        <tr>
                            <th className={`${handles['desktop__ubicacion-bogota--tabla-titulo']} ${handles['tabla-tienda']}`}>TIENDA</th>
                            <th className={`${handles['desktop__ubicacion-bogota--tabla-titulo']} ${handles['tabla-direccion']}`}>DIRECCION</th>
                            <th className={`${handles['desktop__ubicacion-bogota--tabla-titulo']} ${handles['tabla-telefono']}`}>TELEFONOS</th>
                            <th className={`${handles['desktop__ubicacion-bogota--tabla-titulo']} ${handles['tabla-blanco']}`}></th>
                        </tr>
                        {
                            tiendasUbicacion?.map((tienda, index) => {
                                return(
                                    <tr
                                        key={index}
                                    >
                                        <td className={`${handles['desktop__ubicacion-bogota--tabla-row']}`}>{tienda.nombre}</td>
                                        <td className={`${handles['desktop__ubicacion-bogota--tabla-row']} ${handles['cell-border']}`}>{tienda.direccion}</td>
                                        <td className={`${handles['desktop__ubicacion-bogota--tabla-row']} ${handles['cell-border']}`}>
                                            {numeroTelefonicoBogotaFormateado(tienda.PBX,tienda.indicativoCiudad)} {tienda.lineaDirecta !== null && ` - ${numeroTelefonicoBogotaFormateado(tienda.lineaDirecta,tienda.indicativoCiudad)}`}
                                        </td>
                                        <td className={`${handles['desktop__ubicacion-bogota--tabla-row']} ${handles['button-cell']}`}>
                                            <button
                                                className={`${handles['ubicacion-bogota__tabla-row--button']}`}
                                                onClick={() => seleccionarNuevaCiudad(tienda)}
                                            >
                                                VER MÁS <span>{'>'}</span>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </CSSTransition>
        </div>
    )
}

export default UbicacionTiendaBogota;
