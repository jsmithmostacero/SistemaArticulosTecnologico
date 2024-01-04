import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Articulo } from '../models/Articulo';
import { ArticuloService } from '../services/articulo.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticuloSelecServiceService } from '../services/articulo-selec-service.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponentArticulo implements OnInit {
  articulos:Articulo[] = [];
  constructor(
    private articuloService:ArticuloService,
    private router: Router,
    private toastr: ToastrService,
    private articulosSeleccionado: ArticuloSelecServiceService,
  ){

  }
  ngOnInit(): void {
    this.articuloService.lista().subscribe(
      data=>{
        this.articulos=data;
      }
    )
  }

  verProducto(articulo: Articulo) {
    // Navegar a la nueva pantalla con el formulario de venta
    this.router.navigate(['/nuevo-venta', articulo.id]);
  }

  agregarArticuloSeleccionado(articulo:Articulo) {
    this.articulosSeleccionado.agregarSeleccionArticulo(articulo);
    this.toastr.success(articulo.articuloDescripcion+ ' añadito al carrito', 'Carrito de compras');
  }

}
