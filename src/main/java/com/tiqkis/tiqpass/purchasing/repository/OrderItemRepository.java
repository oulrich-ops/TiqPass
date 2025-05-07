package com.tiqkis.tiqpass.purchasing.repository;

import com.tiqkis.tiqpass.domain.purchasing.OrderItem;
import org.springframework.data.repository.CrudRepository;

public interface OrderItemRepository extends CrudRepository<OrderItem, Long> {
}
