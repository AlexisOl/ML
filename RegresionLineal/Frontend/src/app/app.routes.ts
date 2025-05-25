import { Routes } from '@angular/router';
import { VistaGeneralComponent } from './vista-general/vista-general.component';
import { NuevoTerrenoComponent } from './nuevo-terreno/nuevo-terreno.component';

export const routes: Routes = [

    {path: 'vista', component: VistaGeneralComponent},
    {path: 'nuevoTerreno', component: NuevoTerrenoComponent},

    {
        pathMatch: 'full', 
        redirectTo: 'vista',
        path: ''
    }
];
