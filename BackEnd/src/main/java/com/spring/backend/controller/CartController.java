package com.spring.backend.controller;

import com.spring.backend.entity.Cart;
import com.spring.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CartController {

    @Autowired
    private CartService cartService;

    @PreAuthorize("hasRole('User')")
    @GetMapping({"/addToCart/{productId}"})
    public Cart addToCart(@PathVariable(name = "productId") Integer productId){
        return cartService.addToCart(productId);
    }


    @PreAuthorize("hasRole('User')")
    @GetMapping({"/getCartDetails/"})
    public List<Cart> getCartDetails(){
        return cartService.getCartDetails();
    }
}
