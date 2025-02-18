package com.tiqkis.tiqpass.user.repositories;

import com.tiqkis.tiqpass.user.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByUsername(String username);
}