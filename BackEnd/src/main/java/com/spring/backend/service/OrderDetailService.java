package com.spring.backend.service;

import com.spring.backend.configuration.JwtRequestFilter;
import com.spring.backend.dao.CartDAO;
import com.spring.backend.dao.OrderDetailDao;
import com.spring.backend.dao.ProductDao;
import com.spring.backend.dao.UserDao;
import com.spring.backend.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailService {

    private static final String ORDER_PLACED = "Placed";

    @Autowired
    private OrderDetailDao orderDetailDao;
    @Autowired
    private ProductDao productDao;
    @Autowired
    private UserDao userDao;
    @Autowired
    private CartDAO cartDAO;

    public void placeOrder(OrderInput orderInput, boolean isSingleProductCheckout){
        List<OrderProductQuantity> productQuantityList = orderInput.getOrderProductQuantityList();

        for (OrderProductQuantity o : productQuantityList){

            Product product = productDao.findById(o.getProductId()).get();

            String currentUser = JwtRequestFilter.CURRENT_USER;
            User user = userDao.findById(currentUser).get();

            OrderDetail orderDetail = new OrderDetail(
                orderInput.getFullName(),
                orderInput.getFullAddress(),
                orderInput.getContactNumber(),
                orderInput.getAlternateContactNumber(),
                ORDER_PLACED,
                product.getProductDiscountedPrice() * o.getQuantity(),
                product,
                user
            );

            //empty the cart
            if (!isSingleProductCheckout){
                List<Cart> carts = cartDAO.findByUser(user);
                carts.stream().forEach(x -> cartDAO.deleteById(x.getCartId()));
            }

            orderDetailDao.save(orderDetail);
        }
    }
}
