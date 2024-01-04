import { Component, OnInit } from '@angular/core';
import { DetalleVenta } from '../models/DetalleVenta';
import { VentaService } from '../services/venta.service';
import { Venta } from '../models/Venta';
import { ActivatedRoute, Route } from '@angular/router';
import { Router } from '@angular/router';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponentDetalle implements OnInit {
  detallesVenta:DetalleVenta[]=[];
  subTotal:number=0;
  //public myAngularxQrCode: string = "ededed";
  
  constructor(private route: ActivatedRoute,
    private ventaService: VentaService,
    private router:Router){
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId !== null) {
      const numberValue: number = parseInt(productId, 10);
      this.ventaService.obtenerDetallesPorId(numberValue).subscribe(
        (data) => {
          this.detallesVenta = data;
        },
        (error) => {
          console.error('Error en la llamada al servicio:', error);
        }
      );
      
    }
  }

  regresar():void{
    this.router.navigate(["/lista-venta"]);
  }
  calcularSubTotal(cantidad:number,precio:number):number{
    this.subTotal= cantidad*precio;
    return this.subTotal;
  }

  generadorQr(): string {
    // Aquí, puedes usar JSON.stringify o cualquier otra lógica según tus necesidades
    return JSON.stringify("0002010102113944g0ogUJ/a/PcGXhNauxKr855/+8N3pDXl/KDaqnOZ5sY=5204561153036045802PE5906YAPERO6004Lima630476A9");
  }

  generarPdf(){
    const doc = new jsPDF();    
    // Definir posición inicial para la lista
    let yPosition = 20;
    // Tamaño de fuente más pequeño
    const fontSize = 10;
    
    // Agregar encabezado de boleta electrónica
    doc.setFontSize(fontSize);
    doc.setTextColor(0, 0, 0); // Establecer color del texto a negro
    doc.setFont('helvetica', 'bold'); // Establecer fuente en negrita
    doc.text("Nombre de la Empresa: Tienda de Articulos JS", 105, yPosition, { align: 'center' });
    doc.text("Dirección de la Empresa: Urbanización los picapiedras loyola #41", 105, yPosition + 5, { align: 'center' });
    doc.text("Teléfono: 123-456-789", 105, yPosition + 10, { align: 'center' });
    doc.text("Fecha: " + new Date().toLocaleDateString(), 105, yPosition + 15, { align: 'center' });
    yPosition += 25;
    
    // Restaurar el estilo de fuente normal
    
    
    // Agregar encabezados de columnas
    doc.setFontSize(fontSize);
    doc.text("#", 10, yPosition);
    doc.text("Imagen", 30, yPosition);
    doc.text("Cantidades", 70, yPosition);
    doc.text("Precio", 110, yPosition);
    doc.text("Sub.Total", 150, yPosition);
    yPosition += 10;

    doc.setFont('helvetica', 'normal');

    // Iterar sobre la lista de productos y agregar al PDF
    let total = 0;
    this.detallesVenta.forEach((detalleVenta, index) => {
      if(detalleVenta.dcantidad && detalleVenta.dprecioUnitario && detalleVenta.articulo
        && detalleVenta.articulo.articuloImagenUrl){
        const subTotal = detalleVenta.dcantidad * detalleVenta.dprecioUnitario;
      total += subTotal;
    
      doc.text((index + 1).toString(), 10, yPosition);
    
      // Agregar imagen desde URL
      doc.addImage(detalleVenta.articulo.articuloImagenUrl, "PNG | JPEG", 30, yPosition - 8, 10, 10);
    
      doc.text((detalleVenta.dcantidad).toString(), 70, yPosition);

      const formattedPEN = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(detalleVenta.dprecioUnitario);
      doc.text(formattedPEN, 110, yPosition);

      doc.text(new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(subTotal), 150, yPosition);
    
      yPosition += 10;
      }
    });
    
    // Agregar línea separadora
    yPosition += 5;
    doc.line(10, yPosition, 190, yPosition);
    yPosition += 5;
    
    // Agregar importe total
    doc.text("Importe Total:", 110, yPosition);
    doc.text(new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(total), 150, yPosition);
    
    const logoYapeWidth = 20; // ajusta según el ancho deseado del logo de Yape
const logoYapeXPosition = (doc.internal.pageSize.width - logoYapeWidth) / 2;

const logoYapeYPosition = yPosition + 5; // Ajusta la posición vertical según tus necesidades

doc.addImage("https://res.cloudinary.com/dxcsnwzxa/image/upload/v1703857103/logoYape_ekzbe1.png","PNG", logoYapeXPosition, logoYapeYPosition, logoYapeWidth, logoYapeWidth);

// Agregar código QR al mismo nivel que el logo de Yape y separado por 1 cm
const qrCodeWidth = 20; // ajusta según el ancho deseado del código QR
const qrCodeXPosition = (doc.internal.pageSize.width - qrCodeWidth) / 2;
const qrCodeYPosition = logoYapeYPosition; // Mismo nivel que el logo de Yape
const separacion = 3; // 1 cm de separación

doc.addImage("https://res.cloudinary.com/dxcsnwzxa/image/upload/v1703857369/qrYape_lhic1w.png", "PNG", qrCodeXPosition, qrCodeYPosition + logoYapeWidth + separacion, qrCodeWidth, qrCodeWidth);
    // Guardar el PDF
    doc.save("boleta_electronica.pdf");

  }

}
