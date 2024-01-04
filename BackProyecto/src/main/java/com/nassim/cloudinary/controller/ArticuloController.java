package com.nassim.cloudinary.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nassim.cloudinary.entity.Articulo;
import com.nassim.cloudinary.service.CloudinaryService;
import com.nassim.cloudinary.service.ArticuloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/articulo")
@CrossOrigin(origins = "http://localhost:4200")
public class ArticuloController {
    // hola
    @Autowired
    CloudinaryService cloudinaryService;

    @Autowired
    ArticuloService articuloService;

    @GetMapping("/lista")
    public ResponseEntity<List<Articulo>> list(){
        List<Articulo> list = articuloService.list();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/nuevo")
    @ResponseBody
    public ResponseEntity<String> upload(@RequestParam("multipartFile") MultipartFile multipartFile,
                                         @RequestParam("articuloDescripcion") String articuloDescripcion,
                                         @RequestParam("articuloModelo") String articuloModelo,
                                         @RequestParam("articuloMarca") String articuloMarca,
                                         @RequestParam("articuloStock") Integer articuloStock,
                                         @RequestParam("articuloPrecio") BigDecimal articuloPrecio
                                         ) throws IOException {
        BufferedImage bi = ImageIO.read(multipartFile.getInputStream());
        if (bi == null) {
            return new ResponseEntity<>("Image non valide!", HttpStatus.BAD_REQUEST);
        }
        Map<String,Object> result = cloudinaryService.upload(multipartFile);
        Articulo articulo = new Articulo(
                (String) result.get("url"),
                (String) result.get("public_id"),
                articuloDescripcion,
                articuloModelo,
                articuloMarca,
                articuloStock,
                articuloPrecio);
        articuloService.save(articulo);
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse = objectMapper.writeValueAsString(Collections.singletonMap("message", "Articulo ajoutée avec succès !"));
        return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Articulo> getArticuloById(@PathVariable("id") int id) {
            // Intenta obtener el artículo por su ID
            Optional<Articulo> articuloOptional = articuloService.getOne(id);
            // Verifica si el artículo existe
            if (articuloOptional.isPresent()) {
                Articulo articulo = articuloOptional.get();
                return new ResponseEntity<>(articulo, HttpStatus.OK);
            }
            return null;
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int id) {
        Optional<Articulo> articuloOptional = articuloService.getOne(id);
        if (articuloOptional.isEmpty()) {
            return new ResponseEntity<>("n'existe pas", HttpStatus.NOT_FOUND);
        }
        Articulo articulo = articuloOptional.get();
        String cloudinaryImageId = articulo.getArticuloImagenId();
        try {
            cloudinaryService.delete(cloudinaryImageId);
        } catch (IOException e) {
            return new ResponseEntity<>("Failed to delete image from Cloudinary", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        articuloService.delete(id);
        return new ResponseEntity<>("image supprimée !", HttpStatus.OK);
    }



}
