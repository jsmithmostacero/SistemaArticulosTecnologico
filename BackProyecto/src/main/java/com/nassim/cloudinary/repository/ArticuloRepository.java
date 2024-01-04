package com.nassim.cloudinary.repository;

import com.nassim.cloudinary.entity.Articulo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ArticuloRepository extends JpaRepository<Articulo,Integer> {
    List<Articulo> findByOrderById();
}