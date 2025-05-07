package com.tiqkis.tiqpass.purchasing.service;

import com.tiqkis.tiqpass.domain.purchasing.OrderItem;
import com.tiqkis.tiqpass.purchasing.dto.OrderLine;
import com.tiqkis.tiqpass.purchasing.repository.OrderItemRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.List;

public class OrderItemService {

    OrderItemRepository orderItemRepository;

    public OrderItemService(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    public void addOrderItem(OrderItem orderItem) {
        orderItemRepository.save(orderItem);
    }

    @PersistenceContext
    private EntityManager entityManager;

    public List<OrderItem> convertToOrderItems(List<OrderLine> orderLines) {
        return OrderLine.fromDtoList(orderLines, entityManager);
    }
}
