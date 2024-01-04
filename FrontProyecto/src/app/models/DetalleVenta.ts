import { Articulo } from "./Articulo";

export class DetalleVenta {
    id?: number;
    venta_id?:number;
    articulo?:Articulo;
    dcantidad?:number;
    dprecioUnitario?:number

}