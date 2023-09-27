package com.spring.backend.controller;

import com.spring.backend.entity.Role;
import com.spring.backend.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping({"/createNewRole"})
    public Role createNewRole(Role role){
        return roleService.createNewRole(role);
    }
}
