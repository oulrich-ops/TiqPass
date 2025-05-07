package com.tiqkis.tiqpass.user.service;

import com.tiqkis.tiqpass.domain.model.Payer;

public interface ICustomersService {
    Payer findByEmail(String email);

    void addNewCustomer(Payer customer);
}
