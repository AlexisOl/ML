import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import L from 'leaflet';
import { Feature, MultiPolygon, Polygon } from 'geojson';
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
import { coordenadas, terreno } from '../models/terreno';
import { TableModule } from 'primeng/table';
import { UtilidadesService } from '../services/utilidades.service';
@Component({
  selector: 'app-vista-general',
  imports: [ButtonModule, CardModule, SplitterModule, FormsModule, InputGroupModule,
    InputGroupAddonModule, InputTextModule, SelectModule, InputNumberModule, TableModule,

  ],
  templateUrl: './vista-general.component.html',
  styleUrl: './vista-general.component.css'
})
export class VistaGeneralComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  private poligonoActual: L.Layer | null = null;
  private grupoPoligonos!: L.FeatureGroup;
  text1!: string;

  text2!: string;

  text3!: string;

  number: string | undefined;
  precio!: number

  longitud!: number
  latitud!: number

  // servicios
  terrenoServicio = inject(TerrenoService)
  utilidadServicio = inject(UtilidadesService)
  private terrenosGeneral: [number, number][] = []




  constructor() { }

  ngOnInit() {

    if (this.map) {
      this.drawPolygons();
      this.centerMap();
    }

  }


  ngAfterViewInit() {
    this.initMap();
    this.grupoPoligonos = L.featureGroup().addTo(this.map);
    this.terrenoServicio.getAllTerrenos().subscribe((todos: any) => {
      this.obtenerCoordenadas(todos)
    });
  }


  obtenerCoordenadas(todos: any) {
    //eliminar todo
    this.grupoPoligonos.clearLayers();

    if (this.poligonoActual) {
      this.map.removeLayer(this.poligonoActual);
    }
    todos.forEach((terreno: any) => {
      const nombre = terreno.denombre;
      const precio = terreno.precio;
      const area = terreno.dearea;

      const coordenadas = terreno.geom.coordinates;



      const feature: Feature<MultiPolygon> = {
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: coordenadas
        },
        properties: {
          nombre,
          precio,
          area
        }
      };

      const layer = L.geoJSON(feature, {
        style: {
          color: '#3388ff',
          weight: 2,
          fillColor: '#66ccff',
          fillOpacity: 0.4
        },
        onEachFeature: (feature, layer) => {
          if (feature.properties?.nombre) {

            layer.bindPopup(`Terreno: ${feature.properties.nombre}, \n area: ${feature.properties.area}\n precio: ${feature.properties.precio}`);
          }
        }
      }).addTo(this.map);

      this.grupoPoligonos.addLayer(layer);
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

  dibujarPorNombre() {
    this.terrenoServicio.getAllTerrenosPorNombre(this.text1).subscribe(
      (terrenoEspecifico: any) => {
        console.log('Terreno específico:', terrenoEspecifico);
        this.obtenerCoordenadas([terrenoEspecifico])

      }
    )
  }
  guardar() {

    // generacioon de geometria

    const geom = {
      type: "MultiPolygon",
      coordinates: [
        [
          this.terrenoServicio.getSignalCoordenadas().map(coord => [coord.longitud, coord.latitud])
        ]
      ]
    };

    const nuevoTerreno: terreno = {
      decodigo: this.text1,
      denombre: this.text2,
      dearea: 0,
      denorma: this.text3,
      geom: geom,
      precio: Number(this.precio)
    }

    console.log(nuevoTerreno);

    this.terrenoServicio.ingresoNuevoTerreno(nuevoTerreno).subscribe(
      (response) => {
        this.utilidadServicio.mensajes('Éxito', 'El terreno fue creado correctamente.', 'success'); 
    },
    (error) => {
        this.utilidadServicio.mensajes('Error', 'Hubo un problema al crear el terreno.', 'error'); 
    }
    );


  }

  private initMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.map = L.map('map').setView([14.6, -90.5], 13);

    L.tileLayer(baseMapURl).addTo(this.map);
  }

  private centerMap() {
    if (this.grupoPoligonos.getLayers().length > 0) {
      const bounds = this.grupoPoligonos.getBounds();
      if (bounds.isValid()) {
        this.map.fitBounds(bounds);
      } else {
        console.warn('Bounds no válidos, no se puede centrar el mapa');
      }
    }
  }

  agregarCoordenada() {
    const nuevo: coordenadas = {
      latitud: Number(this.latitud),
      longitud: Number(this.longitud)
    }
    this.terrenoServicio.agregarNuevaCoordenada(nuevo);
    this.latitud = 0;
    this.longitud = 0;
  }


}