import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponentArticulo } from './articulo/lista.component';
import { NuevaComponentArticulo } from './articulo/nueva.component';
import { NuevaComponentVenta } from './venta/nueva.component';
import { ListaComponentVenta } from './venta/lista.component';


import path from 'path';
import { ListaComponentDetalle } from './detalle/lista.component';

const routes: Routes = [
  {path:'',component:ListaComponentArticulo},
    {path:'nuevo-articulo',component:NuevaComponentArticulo},
    {path:'lista-articulo',component:ListaComponentArticulo},
    {path:'nuevo-venta',component:NuevaComponentVenta},
    {path:'lista-venta',component:ListaComponentVenta},
    {path: 'nuevo-venta/:id', component: NuevaComponentVenta },
    {path: 'detalles-venta/:id',component:ListaComponentDetalle},

    {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


