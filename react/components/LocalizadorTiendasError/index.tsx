import React from "react";
import { useCssHandles } from 'vtex.css-handles';
import { CSS_HANDLES } from "../cssHandles";
import './styles.css';

const LocalizadorTiendasError = () => {

  //CSS HANDLES
  const handles = useCssHandles(CSS_HANDLES);

  return(
    <div className={handles['localizador__mensaje-error']}>
      <p>Estamos experimentando fallas tecnicas en el momento, por favor intentelo mas tarde.</p>
    </div>
  )
}

export default LocalizadorTiendasError;
