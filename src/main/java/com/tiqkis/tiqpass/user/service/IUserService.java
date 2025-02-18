package com.tiqkis.tiqpass.user.service;

import com.tiqkis.tiqpass.user.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface IUserService {
    UserDetailsService userDetailsService();

    User getCurrentUser();

    User updateUser(User user);
}