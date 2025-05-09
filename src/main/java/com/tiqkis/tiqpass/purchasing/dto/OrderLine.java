package com.tiqkis.tiqpass.purchasing.dto;

import com.tiqkis.tiqpass.domain.model.PriceCategory;
import com.tiqkis.tiqpass.domain.purchasing.OrderItem;
import jakarta.persistence.EntityManager;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderLine {
    private int eventId;
    private int categoryId;
    private String categoryName;
    private int quantity;
    private double price;

    public static OrderItem fromDto(OrderLine dto, EntityManager entityManager) {
        OrderItem orderItem = new OrderItem();
        orderItem.setCategory(entityManager.find(PriceCategory.class,dto.getCategoryId()));
        orderItem.setQuantity(dto.getQuantity());
        orderItem.setUnitPrice(dto.getPrice());


        return orderItem;
    }

    public static List<OrderItem> fromDtoList(List<OrderLine> dtos, EntityManager entityManager) {
        return dtos.stream()
                .map(dto -> fromDto(dto, entityManager))
                .collect(Collectors.toList());
    }

    public double getTotalPrice() {
        return price * quantity;
    }

}
