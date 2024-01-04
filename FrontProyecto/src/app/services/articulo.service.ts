import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Articulo } from '../models/Articulo';


@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  imagenUrl = 'http://Localhost:8080/articulo/';

  constructor(private http: HttpClient) { 
  }

  public lista():Observable<Articulo[]>{
    return this.http.get<Articulo[]>(this.imagenUrl+'lista');
  }

  public nuevo(
    imagen: File, 
    articuloDescripcion: string,
    articuloModelo: string,
    articuloMarca: string,
    articuloStock: number,
    articuloPrecio: number
    ): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', imagen);
    formData.append('articuloDescripcion', articuloDescripcion);
    formData.append('articuloModelo', articuloModelo);
    formData.append('articuloMarca', articuloMarca);
    formData.append('articuloStock',articuloStock.toString());
    formData.append('articuloPrecio', articuloPrecio.toString());
    return this.http.post<any>(this.imagenUrl + 'nuevo', formData, { responseType: 'json' });
  }
  

  public eliminar(id:number):Observable<any>{
    return this.http.delete<any>(this.imagenUrl+'eliminar/${id}');
  }

  public getArticulo(id:number):Observable<Articulo>{
    const url = `http://Localhost:8080/articulo/get/${id}`;
    return this.http.get<Articulo>(url);
  }

}
