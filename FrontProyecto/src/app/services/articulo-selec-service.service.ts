import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Articulo } from '../models/Articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticuloSelecServiceService {

  private articulosSubject = new BehaviorSubject<Articulo[]>([]);
  articulos$ = this.articulosSubject.asObservable();

  agregarSeleccionArticulo(articulo: Articulo) {
    articulo.articuloCantidad=1;
    articulo.articuloSubTotal=articulo.articuloPrecio;
    const articulosActuales = this.articulosSubject.value;
    const productoExistente = articulosActuales.find(p => p.id === articulo.id);

    if (!productoExistente) {
      articulosActuales.push(articulo);
      this.articulosSubject.next(articulosActuales);
    }
  }

  eliminarSeleccionArticulo(id: number) {
    const articulosActuales = this.articulosSubject.value;
    
    // Filtra la lista para excluir el producto con el nombre dado
    const articulosActualizados = articulosActuales.filter(p => p.id !== id);

    this.articulosSubject.next(articulosActualizados);
  }

  modificarSeleccionArticulo(articuloModificado: Articulo) {
    const articulosActuales = this.articulosSubject.value;
    
    // Busca el índice del producto a modificar
    const indice = articulosActuales.findIndex(p => p.id === articuloModificado.id);
  
    if (indice !== -1) {
      // Modifica el artículo existente con los nuevos datos
      articulosActuales[indice] = articuloModificado;
      this.articulosSubject.next([...articulosActuales]);
    }
  }

  eliminarTodosArticulos() {
    // Asigna un nuevo array vacío para eliminar todos los elementos
    this.articulosSubject.next([]);
  }

  constructor() { }
}
