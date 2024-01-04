package com.nassim.cloudinary.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nassim.cloudinary.entity.Articulo;
import com.nassim.cloudinary.entity.DetalleVenta;
import com.nassim.cloudinary.entity.Venta;
import com.nassim.cloudinary.service.ArticuloService;
import com.nassim.cloudinary.service.DetalleVentaService;
import com.nassim.cloudinary.service.VentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/venta")
@CrossOrigin(origins = "http://localhost:4200")

public class VentaController {
    @Autowired
    private VentaService ventaService;
    @Autowired
    private DetalleVentaService detalleVentaService;
    @Autowired
    private ArticuloService articuloService;

    //@GetMapping("/lista")
    //public ResponseEntity<List<DetalleVenta>> list(){
     //   List<DetalleVenta> list = detalleVentaService.list();
     //   return new ResponseEntity<>(list, HttpStatus.OK);
    //}
    @GetMapping("/lista-detalle")
    public List<DetalleVenta> listDetalle(){
        List<DetalleVenta> list = detalleVentaService.list();
        return list;
    }

    @GetMapping("/detalles/{ventaId}")
    @ResponseBody
    public ResponseEntity<List<DetalleVenta>> obtenerDetallesPorId(@PathVariable int ventaId) {
        List<DetalleVenta> detalles = detalleVentaService.listaPorIdVenta(ventaId);
        return new ResponseEntity<>(detalles, HttpStatus.OK);
    }


    @GetMapping("/lista")
    public List<Venta> list(){
        List<Venta> list = ventaService.list();
        return list;
    }

    @PostMapping("/nuevo")
    @ResponseBody
    public ResponseEntity<String> crearVenta(@RequestParam("venta_fecha") String venta_fecha,
                                         @RequestParam("id_articulo") Integer id_articulo,
                                         @RequestParam("cantidad_producto") Integer cantidad_producto
    ) throws JsonProcessingException, ParseException {
        try {
            SimpleDateFormat formatoFecha = new SimpleDateFormat("yyyy-MM-dd");
            Date fecha = formatoFecha.parse(venta_fecha);
            Venta venta = new Venta(fecha);
            ventaService.save(venta);


        Optional<Articulo> articulo = articuloService.getOne(id_articulo);
        DetalleVenta detalleVenta = new DetalleVenta(venta.getId(),
                id_articulo,cantidad_producto,
                articulo.get().getArticuloPrecio());
        //(int venta_id,int articulo_id,int dCantidad,double dPrecioUnitario


        detalleVentaService.save(detalleVenta);

        //Restar la cantidad al Stock
        articulo.get().setArticuloStock(articulo.get().getArticuloStock()-cantidad_producto);
        articuloService.save(articulo.get());
        }catch (Exception ex){

        }
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse = objectMapper.writeValueAsString(Collections.singletonMap("message", "Venta registrada correctamente!"));
        return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
    }
    @PostMapping("/nuevaVenta")
    @ResponseBody
    public ResponseEntity<String> crearVenta(@RequestBody Map<String, Object> payload
    ) throws JsonProcessingException, ParseException {
            String venta_fecha = (String) payload.get("venta_fecha");
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> articulos = (List<Map<String, Object>>) payload.get("articulos");
            SimpleDateFormat formatoFecha = new SimpleDateFormat("yyyy-MM-dd");
            Date fecha = formatoFecha.parse(venta_fecha);
            Venta venta = new Venta(fecha);
            ventaService.save(venta);
            System.out.println("Numero de elementos: "+articulos.size());
            BigDecimal montoTotal = BigDecimal.valueOf(0);
            for (Map<String, Object> articulo : articulos){
               try {
                   int id = ((Number) articulo.get("id")).intValue();  // Convertir a int de manera segura
                   int cantidad = ((Number) articulo.get("articuloCantidad")).intValue();  // Convertir a int de manera segura
                   BigDecimal subTotal = new BigDecimal(articulo.get("articuloSubTotal").toString());  // Convertir a BigDecimal
                   montoTotal = montoTotal.add(subTotal);
                   DetalleVenta detalleVenta = new DetalleVenta(venta.getId(),
                           id,cantidad,subTotal);
                   detalleVentaService.save(detalleVenta);

                   Optional<Articulo> articulo1 = articuloService.getOne(id);
                   //Restar la cantidad al Stock
                   if(articulo1.isPresent()){
                       articulo1.get().setArticuloStock(articulo1.get().getArticuloStock()-cantidad);
                       articuloService.save(articulo1.get());
                   }
               }catch (Exception ex){
                   System.out.println("Ocurrió un error "+ex);
               }
            }
            venta.setTotal(montoTotal);
            ventaService.save(venta);
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse = objectMapper.writeValueAsString(Collections.singletonMap("message", "Venta registrada correctamente!"));
        return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
    }
}
