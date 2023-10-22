package com.spring.backend.dao;

import com.spring.backend.entity.Cart;
import com.spring.backend.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartDAO  extends CrudRepository<Cart,Integer> {
    public List<Cart> findByUser(User user);
}
