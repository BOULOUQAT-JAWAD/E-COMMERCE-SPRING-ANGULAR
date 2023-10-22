package com.spring.backend.service;

import com.spring.backend.configuration.JwtRequestFilter;
import com.spring.backend.dao.CartDAO;
import com.spring.backend.dao.ProductDao;
import com.spring.backend.dao.UserDao;
import com.spring.backend.entity.Cart;
import com.spring.backend.entity.Product;
import com.spring.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductDao productDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private CartDAO cartDAO;

    public Product addNewProduct(Product product){
        return productDao.save(product);
    }

    public List<Product> getAllProducts(int pageNumber, String searchKey){
        Pageable pageable = (Pageable) PageRequest.of(pageNumber,10);

        if(searchKey.equals("")) {
            return (List<Product>) productDao.findAll(pageable);
        }
        return (List<Product>)productDao.findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCase(
                searchKey,searchKey,pageable
        );
    }

    public void deleteProductDetails(Integer productId){
        productDao.deleteById(productId);
    }

    public Product getProductDetailsById(Integer productId){
        return productDao.findById(productId).get();
    }

    public List<Product> getProductDetails( boolean isSingleProductCheckout,Integer productId){
        if(isSingleProductCheckout){
            List<Product> list = new ArrayList<>();
            Product product = productDao.findById(productId).get();
            list.add(product);
            return list;
        }else {
            String username = JwtRequestFilter.CURRENT_USER;
            User user = userDao.findById(username).get();
            List<Cart> carts = cartDAO.findByUser(user);
            return carts.stream().map(Cart::getProduct).collect(Collectors.toList());
        }
    }
}
