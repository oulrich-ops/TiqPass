package com.tiqkis.tiqpass.user.repositories;

import com.tiqkis.tiqpass.domain.model.Payer;
import org.springframework.data.repository.CrudRepository;

public interface CustomersRepository extends CrudRepository<Payer, Long> {
    Payer findByEmail(String email);

    Payer findByPhone(String phone);

    Payer findByFirstNameAndLastName(String firstName, String lastName);
}
