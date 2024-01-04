package com.nassim.cloudinary.service;

import com.nassim.cloudinary.entity.DetalleVenta;
import com.nassim.cloudinary.repository.DetalleVentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DetalleVentaService {
    @Autowired
    private DetalleVentaRepository detalleVentaRepository;

    public List<DetalleVenta> list(){
        return detalleVentaRepository.findAll();
    }

    public Optional<DetalleVenta> getOne(int id){
        return detalleVentaRepository.findById(id);
    }

    public void save(DetalleVenta detalleVenta){
        detalleVentaRepository.save(detalleVenta);
    }

    public void delete(int id){
        detalleVentaRepository.deleteById(id);
    }

    public boolean exists(int id){
        return detalleVentaRepository.existsById(id);
    }

    public List<DetalleVenta> listaPorIdVenta(int id){
        return detalleVentaRepository.findByVentaId(id);
    }
}
