package com.spring.backend.controller;

import com.spring.backend.entity.Product;
import com.spring.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping({"/addNewProduct"})
    public void addNewProduct(@RequestBody Product product){
        productService.addNewProduct(product);
    }

}
