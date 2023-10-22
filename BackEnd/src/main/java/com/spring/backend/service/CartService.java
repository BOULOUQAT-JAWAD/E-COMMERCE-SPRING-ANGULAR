package com.spring.backend.service;

import com.spring.backend.configuration.JwtRequestFilter;
import com.spring.backend.dao.CartDAO;
import com.spring.backend.dao.ProductDao;
import com.spring.backend.dao.UserDao;
import com.spring.backend.entity.Cart;
import com.spring.backend.entity.Product;
import com.spring.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartDAO cartDAO;

    @Autowired
    private ProductDao productDao;

    @Autowired
    private UserDao userDao;

    public Cart addToCart(Integer productId){
        Product product = productDao.findById(productId).get();

        String username = JwtRequestFilter.CURRENT_USER;

        User user = null;
        if (username != null)
            user = userDao.findById(username).get();

        if (product != null && user != null){
            Cart cart = new Cart(product,user);
            return cartDAO.save(cart);
        }
        return null;
    }

    public List<Cart> getCartDetails(){
        String username = JwtRequestFilter.CURRENT_USER;
        User user = userDao.findById(username).get();
        return cartDAO.findByUser(user);
    }
}
