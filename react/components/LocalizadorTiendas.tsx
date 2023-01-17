import React from 'react';
import LocalizadorTiendasCelular from './LocalizadorTiendasCelular';
import LocalizadorTiendasDesktop from './LocalizadorTiendasDesktop';
import { useDevice } from 'vtex.device-detector';
import './styles.css'

const LocalizadorTiendas = () => {

  //DISPOSITIVO
  const { isMobile } = useDevice();
  console.log(isMobile)

  //JSX
  if(isMobile) {
    return (
      <LocalizadorTiendasCelular/>
    );
  }
  return (
    <LocalizadorTiendasDesktop/>
  )
}

export default LocalizadorTiendas;
