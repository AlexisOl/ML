import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  constructor() { }
  mensajes(titulo:string, texto: string, icono: 'success' | 'error' | 'warning' | 'info' | 'question'){
    Swal.fire({
        title: titulo,
        text: texto,
        icon: icono,
        confirmButtonText: 'cerrar'
      })
  }
}
