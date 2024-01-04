package com.nassim.cloudinary.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Data
@Table(name="detalle_venta")
@NoArgsConstructor
public class DetalleVenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "venta_id")
    @JsonBackReference
    private Venta venta;

    @ManyToOne
    @JoinColumn(name = "articulo_id")
    private Articulo articulo;

    private int dCantidad;
    private BigDecimal dPrecioUnitario;

    public DetalleVenta(int venta_id, int articulo_id, int dCantidad, BigDecimal dPrecioUnitario){
        this.dPrecioUnitario = dPrecioUnitario;
        this.dCantidad = dCantidad;
        this.venta = new Venta();
        this.venta.setId(venta_id);
        this.articulo = new Articulo();
        this.articulo.setId(articulo_id);
    }

}
