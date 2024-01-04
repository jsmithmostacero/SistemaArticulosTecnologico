package com.nassim.cloudinary.service;

import com.nassim.cloudinary.repository.ArticuloRepository;
import com.nassim.cloudinary.entity.Articulo;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ArticuloService {

    @Autowired
    ArticuloRepository articuloRepository;

    public List<Articulo> list(){
        return articuloRepository.findByOrderById();
    }

    public Optional<Articulo> getOne(int id){
        return articuloRepository.findById(id);
    }

    public void save(Articulo articulo){
        articuloRepository.save(articulo);
    }

    public void delete(int id){
        articuloRepository.deleteById(id);
    }

    public boolean exists(int id){
        return articuloRepository.existsById(id);
    }
}