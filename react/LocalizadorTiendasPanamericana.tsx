import React from "react";
import LocalizadorTiendas from "./components/LocalizadorTiendas";
import { ContextoGlobal } from "./components/ContextoGlobal";

const LocalizadorTiendasPanamericana = () => {
  return(
    <ContextoGlobal>
      <LocalizadorTiendas/>
    </ContextoGlobal>
  )
}

export default LocalizadorTiendasPanamericana;
