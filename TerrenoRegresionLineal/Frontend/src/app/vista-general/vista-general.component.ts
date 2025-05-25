import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import L from 'leaflet';
import { Feature, Polygon } from 'geojson';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SplitterModule } from 'primeng/splitter';

import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { TerrenoService } from '../services/terreno.service';
import { terreno } from '../models/terreno';
@Component({
  selector: 'app-vista-general',
  imports: [ButtonModule, CardModule, SplitterModule, FormsModule, InputGroupModule,
    InputGroupAddonModule, InputTextModule, SelectModule, InputNumberModule
  ],
  templateUrl: './vista-general.component.html',
  styleUrl: './vista-general.component.css'
})
export class VistaGeneralComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  private poligonoActual: L.Layer | null = null;
  text1!: string ;

  text2: string | undefined;

  number: string | undefined;


  // servicios
  private terrenoServicio = inject(TerrenoService)
  private terrenosGeneral: [number, number][] = []




  constructor() { }

  ngOnInit() {

    if (this.map){
      this.drawPolygons();
      this.centerMap();
    }

  }


  ngAfterViewInit() {
    this.initMap();
    this.terrenoServicio.getAllTerrenos().subscribe((todos: any) => {
      this.obtenerCoordenadas(todos)
    });
  }
  

  obtenerCoordenadas(todos: any) {
    //eliminar todo
    this.terrenosGeneral = []
    todos.forEach((terreno: any) => {
      const nombre = terreno.denombre;
      const coordenadas = terreno.geom.coordinates;
      console.log(`Terrenos: ${nombre}`);
      console.log('Coordenada:', coordenadas);

      terreno.geom.coordinates.forEach((poligono: any) => {
        poligono.forEach((anillo: any) => {
          const coords = anillo.map((c: any) => [c[0], c[1]]);
          this.terrenosGeneral.push(...coords);
        });
      });
    });
    this.drawPolygons();
    this.centerMap();
  }



  drawPolygons() {
    console.log(this.terrenosGeneral);
    if (this.poligonoActual) {
      this.map.removeLayer(this.poligonoActual);
    }
  
    const terrenos: Feature<Polygon> = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [this.terrenosGeneral]
      },
      properties: {}
    };

    this.poligonoActual = L.geoJSON(terrenos, {
      style: {
        color: '#3388ff',
        weight: 3,
        fillColor: '#3388ff',
        fillOpacity: 0.4
      }
    }).addTo(this.map);
  }

  dibujarPorNombre(){
    this.terrenoServicio.getAllTerrenosPorNombre(this.text1).subscribe(
      (terrenoEspecifico: any) => {
      this.obtenerCoordenadas([terrenoEspecifico])

      }
    )
  }

  private initMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.map = L.map('map').setView([-90.5, 14.6], 13);
    L.tileLayer(baseMapURl).addTo(this.map);
  }

  private centerMap() {
    const bounds = L.latLngBounds(this.terrenosGeneral.map(
      ([lng, lat]) => L.latLng(lat, lng)
    ));
    this.map.fitBounds(bounds);
  }
}