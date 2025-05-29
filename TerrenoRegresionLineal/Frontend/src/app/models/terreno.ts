export interface terreno {
    gid?: number;
    decodigo: string;
    denombre: string;
    dearea: number;
    denorma: string;
    geom: object | null
    precio: Number;
}


export interface coordenadas {
    latitud: number,
    longitud: number
}