import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ArticuloService } from '../services/articulo.service';
import { Router } from '@angular/router';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import {
  FormGroup,
  FormBuilder,
  Validator,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Articulo } from '../models/Articulo';


@Component({
  selector: 'app-nueva',
  templateUrl: './nueva.component.html',
  styleUrl: './nueva.component.css',
})
export class NuevaComponentArticulo implements OnInit {
  imagen: File | null = null;
  imagenMin: File | null = null;
  formularioArticulo: FormGroup;

  @ViewChild('imagenInputFile', { static: false }) imagenInputFile!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private articuloService: ArticuloService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService

  ) {
    this.formularioArticulo = fb.group({
      descripcion : new FormControl('',[Validators.required]),
      modelo : new FormControl('',[Validators.required]),
      marca : new FormControl('',[Validators.required]),
      stock : new FormControl('',[Validators.required]),
      precio : new FormControl('',[Validators.required]),
    });
  }

  onUpload(): void {
    if ( this.imagen && this.formularioArticulo.valid)  {
      this.spinner.show();
      this.articuloService.nuevo(
        this.imagen,
        this.formularioArticulo.get('descripcion')?.value,
        this.formularioArticulo.get('modelo')?.value, 
        this.formularioArticulo.get('marca')?.value,
        this.formularioArticulo.get('stock')?.value,
        this.formularioArticulo.get('precio')?.value,
         ).subscribe(
        data => {
          // Manejar la respuesta exitosa aquí
          console.log(data); // Puedes imprimir la respuesta en la consola
          this.toastr.success('Articulo Registrada con éxito', '¡Exito!');
          this.reset();
          this.router.navigate(['/']); // Navegar después de completar las acciones
          this.spinner.hide();
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
    }else{
      this.toastr.error('Complete los campos', 'Error!');
    }
  }

  onFileChange(event: any) {
    this.imagen = event.target.files[0];
    this.imagenMin = null;
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imagenMin = evento.target.result;
    };
    if (this.imagen) {
      fr.readAsDataURL(this.imagen);
    }
  }

  ngOnInit(): void {
    
  }


  reset(): void {
    this.imagen = null;
    this.imagenMin = null;

    const imageInputFile = this.imagenInputFile?.nativeElement as HTMLInputElement;

    if (
      imageInputFile &&
      'value' in imageInputFile &&
      'name' in imageInputFile
    ) {
      imageInputFile.value = '';
      imageInputFile.name = '';
    }
  }
}
