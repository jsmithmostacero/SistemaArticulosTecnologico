import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta } from '../models/Venta';
import { DetalleVenta } from '../models/DetalleVenta';
import { Articulo } from '../models/Articulo';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  Url = 'http://Localhost:8080/venta/';

  constructor(private http: HttpClient) { }

  public lista():Observable<Venta[]>{
    return this.http.get<Venta[]>(this.Url+'lista');
  }

  obtenerDetallesPorId(ventaId: number): Observable<DetalleVenta[]> {
    const url = this.Url+"detalles/"+ventaId;
    return this.http.get<DetalleVenta[]>(url);
  }

  public nuevo(
    fecha: Date, 
    id_articulo: number,
    cantidad_producto: string,
    ): Observable<any> {
    const formData = new FormData();
    formData.append('venta_fecha', fecha.toISOString());
    formData.append('id_articulo', id_articulo.toString());
    formData.append('cantidad_producto', cantidad_producto.toString());

    return this.http.post<any>(this.Url + 'nuevo', formData, { responseType: 'json' });
  }

  public nueva(
    fecha: Date, 
    articulos: Articulo[]
    ): Observable<any> {
    const formData = new FormData();
    formData.append('venta_fecha', fecha.toISOString());
    formData.append('articulos', JSON.stringify(articulos));
    //formData.append('articulos', articulos.toString());

    return this.http.post<any>(this.Url + 'nuevaVenta', formData, { responseType: 'json' });
  }

  public nuevoLista(fecha: Date, articulos: Articulo[]): Observable<any> {
    // Crear un objeto para enviar como JSON
    const requestBody = {
      'venta_fecha': fecha.toISOString(),
      articulos: articulos
    };
  
    // Enviar la solicitud POST con el cuerpo JSON
    return this.http.post<any>(this.Url + 'nuevaVenta', requestBody, { responseType: 'json' });
  }
  

  public eliminar(id:number):Observable<any>{
    return this.http.delete<any>(this.Url+'eliminar/${id}');
  }
}
