package com.spring.backend.entity;

public class JwtRequest {

    private String UserName;
    private String UserPasswod;

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String userName) {
        UserName = userName;
    }

    public String getUserPasswod() {
        return UserPasswod;
    }

    public void setUserPasswod(String userPasswod) {
        UserPasswod = userPasswod;
    }
}
