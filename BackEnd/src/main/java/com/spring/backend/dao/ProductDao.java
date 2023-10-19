package com.spring.backend.dao;

import com.spring.backend.entity.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;
import java.util.List;

@Repository
public interface ProductDao extends CrudRepository<Product,Integer> {
    public List<Product> findAll(Pageable pageable);
}
