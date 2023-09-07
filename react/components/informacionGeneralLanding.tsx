import React, { useContext } from "react";
import { Context } from "./ContextoGlobal";

const ciudadesPanamericana = ['Bogotá', 'Soacha' ,'Barranquilla', 'Bucaramanga', 'Cali', 'Cartagena', 'Chía', 'Cúcuta','Ibagué', 'Manizales', 'Medellín', 'Montería', 'Neiva', 'Pereira' , 'Santa Marta', 'Valledupar', 'Villavicencio'];

const numeroTelefonicoFormateado = (numeroTelefono:string | undefined, indicativoCiudad: string | undefined) => {
  if(numeroTelefono) {
    if(numeroTelefono.includes(' ')) {
        const [pbxOne, pbxTwo] = numeroTelefono.split(' ');
        const pbxOneFormated = `(${indicativoCiudad}) ${pbxOne.slice(0,3)} ${pbxOne.slice(3,5)} ${pbxOne.slice(5)}`;
        const pbxTwoFormated = `(${indicativoCiudad}) ${pbxTwo.slice(0,3)} ${pbxTwo.slice(3,5)} ${pbxTwo.slice(5)}`;
        const finalPbxNumberFormated = `${pbxOneFormated} - ${pbxTwoFormated}`;
        return finalPbxNumberFormated;

    }
    const telefonoFormateado = `${numeroTelefono.slice(0,3)} ${numeroTelefono.slice(3,5)} ${numeroTelefono.slice(5)}`;
    return `(${indicativoCiudad}) ${telefonoFormateado}`;
  }
  return
}

const numeroTelefonicoBogotaFormateado = (numeroTelefono:string | undefined, indicativoCiudad: string | undefined) => {
  if(numeroTelefono) {
    if(numeroTelefono.includes(' ')) {
        const [pbxOne, pbxTwo] = numeroTelefono.split(' ');
        const finalPbxNumberFormated = `(${indicativoCiudad}) ${pbxOne} - (${indicativoCiudad}) ${pbxTwo}`;
        return finalPbxNumberFormated;

    }
    return `(${indicativoCiudad}) ${numeroTelefono}`;
  }
  return
}

const horarioFormateado = () => {

  //ESTADO GLOBAL
  const estadoGlobal = useContext(Context);

  const horarioLunesViernes = estadoGlobal?.tiendaSeleccionada?.horarioLunesViernes.replace(" ","").split("-") || 'Por definir';
  const horariosabado = estadoGlobal?.tiendaSeleccionada?.horarioSabado?.replace(" ","").split("-");
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
    if(horariosabado) {
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
    } else {
      if(horarioDomingoFestivo) {
        return(
          <>
            <p>Horario: Lun. - Vier. {`${horarioLunesViernes[0]} a.m. - ${+horarioLunesViernes[1].slice(0,3) - 12}${horarioLunesViernes[1].slice(3)} p.m.`}</p>
            <p>Sáb. No abre</p>
            <p>Dom. - Fest. {`${horarioDomingoFestivo[0]} a.m. - ${+horarioDomingoFestivo[1].slice(0,3) - 12}${horarioDomingoFestivo[1].slice(3)} p.m.`}</p>
          </>
        )
      }
      return(
        <>
          <p>Horario: Lun. - Vier. {`${horarioLunesViernes[0]} a.m. - ${+horarioLunesViernes[1].slice(0,3) - 12}${horarioLunesViernes[1].slice(3)} p.m.`}</p>
          <p>Sáb. No abre</p>
          <p>Dom. - Fest. No abre</p>
        </>
      )
    }
  }
}

const horarioCiudadesFormateado = (horarioLunesViernes:string, horarioSabado:string, horarioDomingoFestivo:string | null) => {

  const horarioLunesViernesFormateado = horarioLunesViernes.replace(" ","").split("-") || 'Por definir';
  const horariosabadoFormateado = horarioSabado?.replace(" ","").split("-");
  const horarioDomingoFestivoFormateado = horarioDomingoFestivo?.replace(" ","").split("-");

  if(horarioLunesViernesFormateado === horariosabadoFormateado) {
    if(horarioDomingoFestivoFormateado) {
      return(
        <>
          <p>Horario: Lun. - Sáb. {`${horarioLunesViernes[0]} a.m. - ${+horarioLunesViernesFormateado[1].slice(0,3) - 12}${horarioLunesViernesFormateado[1].slice(3)} p.m.`}</p>
          <p>Dom. - Fest. {`${horarioDomingoFestivoFormateado[0]} a.m. - ${+horarioDomingoFestivoFormateado[1].slice(0,3) - 12}${horarioDomingoFestivoFormateado[1].slice(3)} p.m.`}</p>
        </>
      )
    }
    return(
      <>
        <p>Horario: Lun. - Sáb. {`${horarioLunesViernesFormateado[0]} a.m. - ${+horarioLunesViernesFormateado[1].slice(0,3) - 12}${horarioLunesViernes[1].slice(3)} p.m.`}</p>
        <p>Dom. - Fest. No abre</p>
      </>
    )
  } else {
    if(horariosabadoFormateado) {
      if(horarioDomingoFestivoFormateado) {
        return(
          <>
            <p>Horario: Lun. - Vier. {`${horarioLunesViernesFormateado[0]} a.m. - ${+horarioLunesViernesFormateado[1].slice(0,3) - 12}${horarioLunesViernesFormateado[1].slice(3)} p.m.`}</p>
            <p>Sáb. {`${horariosabadoFormateado[0]} a.m. - ${+horariosabadoFormateado[1].slice(0,3) - 12}${horariosabadoFormateado[1].slice(3)} p.m.`}</p>
            <p>Dom. - Fest. {`${horarioDomingoFestivoFormateado[0]} a.m. - ${+horarioDomingoFestivoFormateado[1].slice(0,3) - 12}${horarioDomingoFestivoFormateado[1].slice(3)} p.m.`}</p>
          </>
        )
      }
      return(
        <>
          <p>Horario: Lun. - Vier. {`${horarioLunesViernesFormateado[0]} a.m. - ${+horarioLunesViernesFormateado[1].slice(0,3) - 12}${horarioLunesViernesFormateado[1].slice(3)} p.m.`}</p>
          <p>Sáb. {`${horariosabadoFormateado[0]} a.m. - ${+horariosabadoFormateado[1].slice(0,3) - 12}${horariosabadoFormateado[1].slice(3)} p.m.`}</p>
          <p>Dom. - Fest. No abre</p>
        </>
      )
    } else {
      if(horarioDomingoFestivoFormateado) {
        return(
          <>
            <p>Horario: Lun. - Vier. {`${horarioLunesViernesFormateado[0]} a.m. - ${+horarioLunesViernesFormateado[1].slice(0,3) - 12}${horarioLunesViernesFormateado[1].slice(3)} p.m.`}</p>
            <p>Sáb. No abre</p>
            <p>Dom. - Fest. {`${horarioDomingoFestivoFormateado[0]} a.m. - ${+horarioDomingoFestivoFormateado[1].slice(0,3) - 12}${horarioDomingoFestivoFormateado[1].slice(3)} p.m.`}</p>
          </>
        )
      }
      return(
        <>
          <p>Horario: Lun. - Vier. {`${horarioLunesViernesFormateado[0]} a.m. - ${+horarioLunesViernesFormateado[1].slice(0,3) - 12}${horarioLunesViernesFormateado[1].slice(3)} p.m.`}</p>
          <p>Sáb. No abre</p>
          <p>Dom. - Fest. No abre</p>
        </>
      )
    }
  }
}

export { ciudadesPanamericana, numeroTelefonicoFormateado, numeroTelefonicoBogotaFormateado, horarioFormateado, horarioCiudadesFormateado }
