package com.spring.backend.entity;

import jakarta.persistence.*;

@Entity
@Table
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer cartId;
    @ManyToOne
    private Product product;
    @ManyToOne
    private User user;

    public Cart(Product product, User user) {
        this.product = product;
        this.user = user;
    }

    public Cart() {}

    public Integer getCartId() {
        return cartId;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
