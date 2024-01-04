package com.nassim.cloudinary.entity;

import javax.persistence.*;

import lombok.*;

import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="articulos")
public class Articulo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String articuloImagenUrl;
    private String articuloImagenId;
    private String articuloDescripcion;
    private String articuloModelo;
    private String articuloMarca;
    private Integer articuloStock;
    private BigDecimal articuloPrecio;
    //para manejar la cantidad
    private Integer articuloCantidad;
    private BigDecimal articuloSubTotal;

    public Articulo(String articuloImagenUrl,
                    String articuloImagenId,
                    String articuloDescripcion,
                    String articuloModelo,
                    String articuloMarca,
                    Integer articuloStock,
                    BigDecimal articuloPrecio) {
        this.articuloImagenUrl = articuloImagenUrl;
        this.articuloImagenId = articuloImagenId;
        this.articuloDescripcion = articuloDescripcion;
        this.articuloModelo = articuloModelo;
        this.articuloMarca = articuloMarca;
        this.articuloStock = articuloStock;
        this.articuloPrecio = articuloPrecio;
    }
}
