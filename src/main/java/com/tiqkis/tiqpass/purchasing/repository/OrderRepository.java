package com.tiqkis.tiqpass.purchasing.repository;

import com.tiqkis.tiqpass.domain.purchasing.Order;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderRepository extends CrudRepository<Order, Long> {

    List<Order> findAllByTicketingId(Long ticketingId);
}
