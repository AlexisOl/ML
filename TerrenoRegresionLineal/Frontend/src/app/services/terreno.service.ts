import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { coordenadas, terreno } from '../models/terreno';
import { Signal, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class TerrenoService {

  private readonly URL = environment.URL_BACK+"terrenos";
  private terrenos= signal<terreno[]>([]);
  private coordenadasNuevas = signal<coordenadas[]>([]);

  constructor(private http: HttpClient) { 
    this.getAllTerrenos()
  }

  getAllTerrenos() {
    return this.http.get(
      this.URL+"/"
    )
  }

  getSignalTerreno (){
    return this.terrenos()
  }

  getSignalCoordenadas (){
    return this.coordenadasNuevas()
  }

  getAllTerrenosPorNombre(nombre: string) {
    return this.http.get(
      this.URL+"/porNombre/"+nombre
    )
  }


  ingresoNuevoTerreno(Terrenos: terreno) {
    return this.http.post(
      this.URL+"/", Terrenos
    )
  }
  // coordenada
  agregarNuevaCoordenada(coordenada: coordenadas) {
    this.coordenadasNuevas.update(coordenasActuales => [
      ...coordenasActuales,
      coordenada
    ]
    )
  }

}
