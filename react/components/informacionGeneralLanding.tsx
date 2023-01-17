import React, { useContext } from "react";
import { Context } from "./ContextoGlobal";

const ciudadesPanamericana = ['Bogotá', 'Soacha' ,'Barranquilla', 'Bucaramanga', 'Cali', 'Cartagena', 'Chía', 'Cúcuta','Ibagué', 'Manizales', 'Medellín', 'Montería', 'Neiva', 'Pereira' , 'Santa Marta', 'Valledupar', 'Villavicencio'];

const numeroTelefonicoFormateado = (numeroTelefono:string | undefined) => {
  if(numeroTelefono) {
    if(numeroTelefono.includes(' ')) {
        const [pbxOne, pbxTwo] = numeroTelefono.split(' ');
        const pbxOneFormated = `${pbxOne.slice(0,3)} ${pbxOne.slice(3,5)} ${pbxOne.slice(5)}`;
        const pbxTwoFormated = `${pbxTwo.slice(0,3)} ${pbxTwo.slice(3,5)} ${pbxTwo.slice(5)}`;
        const finalPbxNumberFormated = `${pbxOneFormated} - ${pbxTwoFormated}`;
        return finalPbxNumberFormated;

    }
    const telefonoFormateado = `${numeroTelefono.slice(0,3)} ${numeroTelefono.slice(3,5)} ${numeroTelefono.slice(5)}`;
    return telefonoFormateado;
  }
  return
}

const horarioFormateado = () => {

  //ESTADO GLOBAL
  const estadoGlobal = useContext(Context);

  const horarioLunesViernes = estadoGlobal?.tiendaSeleccionada?.horarioLunesViernes.replace(" ","").split("-") || 'Por definir';
  const horariosabado = estadoGlobal?.tiendaSeleccionada?.horarioSabado.replace(" ","").split("-") || 'Por definir';
  const horarioDomingoFestivo = estadoGlobal?.tiendaSeleccionada?.horarioDomingoFestivo?.replace(" ","").split("-");
  if(estadoGlobal?.tiendaSeleccionada?.horarioLunesViernes === estadoGlobal?.tiendaSeleccionada?.horarioSabado) {
    if(horarioDomingoFestivo) {
      return(
        <>
          <p>Horario: Lun. - Sáb. {`${horarioLunesViernes[0]} a.m. - ${+horarioLunesViernes[1].slice(0,3) - 12}${horarioLunesViernes[1].slice(3)} p.m.`}</p>
          <p>Dom. - Fest. {`${horarioDomingoFestivo[0]} a.m. - ${+horarioDomingoFestivo[1].slice(0,3) - 12}${horarioDomingoFestivo[1].slice(3)} p.m.`}</p>
        </>
      )
    }
    return(
      <>
        <p>Horario: Lun. - Sáb. {`${horarioLunesViernes[0]} a.m. - ${+horarioLunesViernes[1].slice(0,3) - 12}${horarioLunesViernes[1].slice(3)} p.m.`}</p>
        <p>Dom. - Fest. No abre</p>
      </>
    )
  } else {
    if(horarioDomingoFestivo) {
      return(
        <>
          <p>Horario: Lun. - Vier. {`${horarioLunesViernes[0]} a.m. - ${+horarioLunesViernes[1].slice(0,3) - 12}${horarioLunesViernes[1].slice(3)} p.m.`}</p>
          <p>Sáb. {`${horariosabado[0]} a.m. - ${+horariosabado[1].slice(0,3) - 12}${horariosabado[1].slice(3)} p.m.`}</p>
          <p>Dom. - Fest. {`${horarioDomingoFestivo[0]} a.m. - ${+horarioDomingoFestivo[1].slice(0,3) - 12}${horarioDomingoFestivo[1].slice(3)} p.m.`}</p>
        </>
      )
    }
    return(
      <>
        <p>Horario: Lun. - Vier. {`${horarioLunesViernes[0]} a.m. - ${+horarioLunesViernes[1].slice(0,3) - 12}${horarioLunesViernes[1].slice(3)} p.m.`}</p>
        <p>Sáb. {`${horariosabado[0]} a.m. - ${+horariosabado[1].slice(0,3) - 12}${horariosabado[1].slice(3)} p.m.`}</p>
        <p>Dom. - Fest. No abre</p>
      </>
    )
  }
}

const horarioLunesSabadoFormateado = (horarioLunesViernes:string, horarioSabado:string) => {
  
  const horarioLunesViernesFormateado = horarioLunesViernes.replace(" ", "").split("-") || 'Por definir';
  const horariosabadoFormateado = horarioSabado.replace(" ", "").split("-") || 'Por definir';

  if (horarioLunesViernes === horarioSabado) {
    return (
      <>
        <p>Horario: Lun. - Sáb. {`${horarioLunesViernesFormateado[0]} a.m. - ${+horarioLunesViernesFormateado[1].slice(0, 3) - 12}${horarioLunesViernesFormateado[1].slice(3)} p.m.`}</p>
      </>
    )
  } else {
    return (
      <>
        <p>Horario: Lun. - Vier. {`${horarioLunesViernesFormateado[0]} a.m. - ${+horarioLunesViernesFormateado[1].slice(0, 3) - 12}${horarioLunesViernesFormateado[1].slice(3)} p.m.`}</p>
        <p>Sáb. {`${horariosabadoFormateado[0]} a.m. - ${+horariosabadoFormateado[1].slice(0, 3) - 12}${horariosabadoFormateado[1].slice(3)} p.m.`}</p>
      </>
    )
  }
}

export { ciudadesPanamericana, numeroTelefonicoFormateado, horarioFormateado, horarioLunesSabadoFormateado }
