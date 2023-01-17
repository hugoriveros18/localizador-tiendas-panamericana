import React, { useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useCssHandles } from 'vtex.css-handles';
import CiudadesDisponibles from '../CiudadesDisponibles';
import TiendasDisponibles from '../TiendasDisponibles';
import TiendaSeleccionada from '../TiendaSeleccionada';
import { Context } from '../ContextoGlobal';
import './styles.css';
import { CSS_HANDLES } from '../cssHandles';
import ListaTiendasMobile from '../ListaTiendasMobile';

const LocalizadorTiendasCelular = () => {

    //ESTADO GLOBAL
    const estadoGlobal = useContext(Context);

    //CSS HANDLES
    const handles = useCssHandles(CSS_HANDLES);

    //JSX
    return (
        <div className={`${handles['celular__localizador-tiendas--app-contenerdor']}`}>
            <div
                className={`${handles['celular__localizador-tiendas--contenedor-general']}`}
                style={
                    estadoGlobal?.tiendaSeleccionada !== null
                    ? {gap: '20px'}
                    : {}
                }
            >
                <CSSTransition
                    in={estadoGlobal?.tiendaSeleccionada !== null}
                    timeout={300}
                    classNames={handles["localizador-tiendas__transition"]}
                >
                    <div className={`${handles['celular__localizador-tiendas--main-contenedor']}`}>
                        <div
                            className={`${handles['celular__localizador-tiendas--header-contenedor']}`}
                            style={
                                estadoGlobal?.tiendaSeleccionada !== null
                                    ? {alignItems: 'center'}
                                    : {}
                            }
                        >
                            <h1
                            className={`${handles['celular__localizador-tiendas--header-contenedor--titulo']}`}
                            style={
                                estadoGlobal?.tiendaSeleccionada !== null
                                ? {textAlign: 'center'}
                                : {}
                            }
                            >
                                NUESTRAS TIENDAS
                            </h1>
                            <p
                            className={`${handles['celular__localizador-tiendas--header-contenedor--descripcion']}`}
                            style={
                                estadoGlobal?.tiendaSeleccionada !== null
                                ? {padding: "0px 30px"}
                                : {}
                            }
                            >
                                Seleccione la ubicación y la tienda para ver la información
                            </p>
                        </div>
                        <div className={`${handles['celular__localizador-tiendas--selectores-contenedor']}`}>
                            <CiudadesDisponibles/>
                            <TiendasDisponibles/>
                        </div>
                    </div>
                </CSSTransition>
                <TiendaSeleccionada/>
                <ListaTiendasMobile/>
            </div>
        </div>
    )
}

export default LocalizadorTiendasCelular;
