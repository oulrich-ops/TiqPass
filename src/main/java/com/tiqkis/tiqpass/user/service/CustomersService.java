package com.tiqkis.tiqpass.user.service;

import com.tiqkis.tiqpass.domain.model.Payer;
import com.tiqkis.tiqpass.user.repositories.CustomersRepository;
import org.springframework.stereotype.Service;

@Service
public class CustomersService implements ICustomersService {

    private final CustomersRepository customersRepository;

    public CustomersService(CustomersRepository customersRepository) {
        this.customersRepository = customersRepository;
    }

    @Override
    public Payer findByEmail(String email) {
        return customersRepository.findByEmail(email);
    }

    @Override
    public void addNewCustomer(Payer customer) {
        customersRepository.save(customer);
    }

    public void updateCustomer(Payer customer) {
        customersRepository.save(customer);
    }

}
