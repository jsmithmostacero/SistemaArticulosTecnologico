import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  NgModule,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import {
  FormGroup,
  FormBuilder,
  Validator,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { VentaService } from '../services/venta.service';
import { CommonModule, getLocaleDateFormat } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Articulo } from '../models/Articulo';
import { ArticuloService } from '../services/articulo.service';
import { error } from 'console';
import { ArticuloSelecServiceService } from '../services/articulo-selec-service.service';

@Component({
  selector: 'app-nueva',
  templateUrl: './nueva.component.html',
  styleUrl: './nueva.component.css',
})
export class NuevaComponentVenta implements OnInit {
  cantidad: number = 0;
  formularioVenta: FormGroup;
  articulo: Articulo;
  articulos: Articulo[] = [];
  constructor(
    private fb: FormBuilder,
    private ventaService: VentaService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private articuloService: ArticuloService,
    private articulosSeleccionado: ArticuloSelecServiceService
  ) {
    this.articulo = new Articulo();
    this.formularioVenta = fb.group({
      //descripcion: new FormControl('', [Validators.required]),
      //precio:new FormControl('', [Validators.required]),
      //imagenUrl:new FormControl('', [Validators.required]),
      //unidades: [0, Validators.required] 

    });

  }

  ngOnInit(): void {
    // Obtener el ID del producto de la ruta

    //const productId = this.route.snapshot.paramMap.get('id');
    //alert(productId);
    // if (productId !== null) {
    //   const numberValue: number = parseInt(productId, 10);
    //   this.articuloService.getArticulo(numberValue).subscribe(
    //     (data) => {
    //       this.articulo = data;
    //       this.inicializarFormularioConArticulo(this.articulo);
    //     },
    //     (error) => {
    //       console.error('Error en la llamada al servicio:', error);
    //     }
    //   );
      
    // }

    this.articulosSeleccionado.articulos$.subscribe((articulos) => {
      this.articulos = articulos;
    });

  }

  eliminarProductoSeleccionado(id?:number){
    if(id){
      this.articulosSeleccionado.eliminarSeleccionArticulo(id);
    }
  }

  eliminarTodosArticulos(){
    this.articulosSeleccionado.eliminarTodosArticulos();
  }

  crearVenta() {
      this.spinner.show();
      this.ventaService.nuevoLista(
        new Date(),
        this.articulos
         ).subscribe(
        data => {
          // Manejar la respuesta exitosa aquí
          console.log(data); // Puedes imprimir la respuesta en la consola
          this.toastr.success('Venta Registrada con éxito', '¡Exito!');
          //this.reset();
          this.router.navigate(['/lista-venta']); // Navegar después de completar las acciones
          this.spinner.hide();
          this.eliminarTodosArticulos();
          // Otras acciones que desees realizar en caso de éxito
        },
        err => {
          // Manejar errores aquí
          this.spinner.hide();
          console.error(err); // Puedes imprimir el error en la consola
          this.toastr.error('Ocurrió algún error', 'Error!');
          // Otras acciones que desees realizar en caso de error
        }
      );
  }

  incrementar(articulo:Articulo) {
    if(articulo.articuloCantidad && articulo.articuloPrecio){
      articulo.articuloCantidad= articulo.articuloCantidad+1;
      articulo.articuloSubTotal = articulo.articuloCantidad*articulo.articuloPrecio;
      this.articulosSeleccionado.modificarSeleccionArticulo(articulo);
    }

  }

  decrementar(articulo:Articulo) {

    if(articulo.articuloCantidad && articulo.articuloPrecio){
      if (articulo.articuloCantidad != 1) {
      articulo.articuloCantidad= articulo.articuloCantidad-1;
      articulo.articuloSubTotal = articulo.articuloCantidad*articulo.articuloPrecio;
      this.articulosSeleccionado.modificarSeleccionArticulo(articulo);
    }
  }
}
  inicializarFormularioConArticulo(articulo: any) {
    //if(this.formularioVenta){
    //if (articulo) {
    this.formularioVenta.patchValue({
      descripcion: articulo.articuloDescripcion, // Convierte a cadena si es un número
      precio: 'S/. '+ articulo.articuloPrecio,
      imagenUrl: articulo.articuloImagenUrl,
    });
    //this.unidades=10;
    //} else {
    console.error('El artículo no es válido.');
    //}
    //}
  }
}
