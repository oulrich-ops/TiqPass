package com.tiqkis.tiqpass.purchasing.service;

import com.tiqkis.tiqpass.domain.model.Payer;
import com.tiqkis.tiqpass.domain.model.PriceCategory;
import com.tiqkis.tiqpass.domain.model.Ticketing;
import com.tiqkis.tiqpass.domain.purchasing.Order;
import com.tiqkis.tiqpass.domain.purchasing.OrderItem;
import com.tiqkis.tiqpass.domain.purchasing.OrderStatus;
import com.tiqkis.tiqpass.purchasing.dto.PurchaseDTO;
import com.tiqkis.tiqpass.purchasing.repository.OrderRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    OrderRepository orderRepository;
    @PersistenceContext
    private EntityManager entityManager;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public void addOrder(Order order) {
        orderRepository.save(order);
    }

        @Transactional
        public Order createOrderFromFrontend(PurchaseDTO orderDTO, Payer payer) {
             Order order = new Order();

            System.out.println("ticketing id: " + orderDTO.getEventId());

             order.setTicketing(entityManager.find(Ticketing.class, orderDTO.getEventId()));
            order.setCustomer(payer);
            order.setStripeSessionId("");
            order.setTotalAmount(orderDTO.getTotalAmount());
            order.setStatus(OrderStatus.PENDING);

            entityManager.persist(order);

             List<OrderItem> orderItems = orderDTO.getTickets().stream()
                    .map(dto -> {
                        OrderItem orderItem = new OrderItem();
                        orderItem.setOrder(order);
                        orderItem.setCategory(entityManager.find(PriceCategory.class, dto.getCategoryId()));
                        orderItem.setQuantity(dto.getQuantity());
                        orderItem.setUnitPrice(dto.getPrice());
                        return orderItem;
                    })
                    .collect(Collectors.toList());

             orderItems.forEach(entityManager::persist);

             order.setItems(orderItems);
            orderRepository.save(order);


            return order;
        }

    public Order findOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    public void save(Order order) {
        orderRepository.save(order);
    }
}


