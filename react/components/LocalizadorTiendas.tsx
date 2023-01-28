import React, { useContext } from 'react';
import LocalizadorTiendasCelular from './LocalizadorTiendasCelular';
import LocalizadorTiendasDesktop from './LocalizadorTiendasDesktop';
import { useDevice } from 'vtex.device-detector';
import './styles.css'
import { Context } from './ContextoGlobal';
import LocalizadorTiendasError from './LocalizadorTiendasError';

const LocalizadorTiendas = () => {

  //ESTADO GLOBAL
  const estadoGlobal = useContext(Context);

  //DISPOSITIVO
  const { isMobile } = useDevice();

  //JSX
  if(isMobile) {
    return (
      <LocalizadorTiendasCelular/>
    );
  }
  return (
    <>
      {
        estadoGlobal?.fetchError &&
          <LocalizadorTiendasError/>
      }
      <LocalizadorTiendasDesktop/>
    </>
  )
}

export default LocalizadorTiendas;
