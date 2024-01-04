import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DetalleVenta } from '../models/DetalleVenta';
import { VentaService } from '../services/venta.service';
import { Venta } from '../models/Venta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponentVenta implements OnInit {
    detalleVentas:DetalleVenta[]=[];
    ventas:Venta[]=[];
    subTotal:number=0;

  constructor(private ventaService: VentaService,
   private router:Router){
    
  }

  ngOnInit(): void {
    this.ventaService.lista().subscribe(
      data=>{
        this.ventas=data;
        
      }
    )
  }
  

  verDetalleVenta(idVenta:number){
    this.ventaService.obtenerDetallesPorId(idVenta);
    this.router.navigate(['/detalles-venta', idVenta]);
  } 
}
