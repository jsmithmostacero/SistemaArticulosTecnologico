package com.nassim.cloudinary.service;
import com.nassim.cloudinary.entity.Venta;
import com.nassim.cloudinary.repository.VentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class VentaService {
    @Autowired
    private VentaRepository ventaRepository;

    public Venta save(Venta venta){
        return ventaRepository.save(venta);
    }

    public List<Venta> list(){
        return ventaRepository.findAll();
    }

    public Optional<Venta> getOne(int id){
        return ventaRepository.findById(id);
    }


    public void delete(int id){
        ventaRepository.deleteById(id);
    }

    public boolean exists(int id){
        return ventaRepository.existsById(id);
    }
}
