type ContextoGlobalProps = {
    children: React.ReactNode;
}

type UbicacionTiendaBogotaProps = {
    ubicacionTienda: string
}

type TiendaSeleccionada = {
    ciudad: string
    nombre: string
    direccion: string
    horarioLunesViernes: string
    horarioSabado: string
    horarioDomingoFestivo: string | null
    indicativoCiudad: string
    PBX: string
    lineaDirecta: string | null
    domicilios: string | null
    parqueadero: boolean
    imagenTienda: string
    linkGoogleMaps: string
    linkWaze: string
    ubicacionGeografica: string
    flagActivo: boolean
    textoFlag: string
}

type LocalizadorTiendasProps = {
    ciudadSeleccionada: string
    listaTiendas: TiendaSeleccionada[]
    tiendaSeleccionada: TiendaSeleccionada | null
    verTodasLasTiendasMobile: TiendaSeleccionada[] | null
    fetchError: boolean
    setTiendaSeleccionada: React.Dispatch<React.SetStateAction<TiendaSeleccionada | null>>
    setListaTiendas: React.Dispatch<React.SetStateAction<TiendaSeleccionada[]>>
    setCiudadSeleccionada: React.Dispatch<React.SetStateAction<string>>
    setVerTodasLasTiendasMobile: React.Dispatch<React.SetStateAction<TiendaSeleccionada[] | null>>
    setFetchError: React.Dispatch<React.SetStateAction<boolean>>
}

export { ContextoGlobalProps, LocalizadorTiendasProps, TiendaSeleccionada, UbicacionTiendaBogotaProps }
