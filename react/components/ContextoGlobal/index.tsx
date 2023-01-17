import React, { useState, createContext } from 'react';
import { ContextoGlobalProps, LocalizadorTiendasProps, TiendaSeleccionada } from '../types.d';

const Context = createContext<LocalizadorTiendasProps | null>(null);

const ContextoGlobal = ({children}:ContextoGlobalProps) => {

  //ESTADOS
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState<string>('');
  const [listaTiendas, setListaTiendas] = useState<TiendaSeleccionada[]>([]);
  const [tiendaSeleccionada, setTiendaSeleccionada] = useState<TiendaSeleccionada | null>(null);
  const [verTodasLasTiendasMobile, setVerTodasLasTiendasMobile] = useState<TiendaSeleccionada[] | null>(null);

  //JSX
  return(
      <Context.Provider
          value={{
              ciudadSeleccionada: ciudadSeleccionada,
              listaTiendas: listaTiendas,
              tiendaSeleccionada: tiendaSeleccionada,
              verTodasLasTiendasMobile: verTodasLasTiendasMobile,
              setCiudadSeleccionada: setCiudadSeleccionada,
              setListaTiendas: setListaTiendas,
              setTiendaSeleccionada: setTiendaSeleccionada,
              setVerTodasLasTiendasMobile: setVerTodasLasTiendasMobile
          }}
      >
          {children}
      </Context.Provider>
  )

}

export { ContextoGlobal, Context }
