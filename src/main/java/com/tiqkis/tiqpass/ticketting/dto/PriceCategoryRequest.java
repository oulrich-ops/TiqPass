package com.tiqkis.tiqpass.ticketting.dto;

import com.tiqkis.tiqpass.domain.model.PriceCategory;
import lombok.Data;

@Data
public class PriceCategoryRequest {
    private Long id;
    private Long ticketting_id;
    private String name;
    private double price;
    private String description;
    private int totalLimit;
    private Integer limitPerOrder;
    private boolean hasOrderLimit;


    public static PriceCategoryRequest fromEntity(PriceCategory entity) {
        PriceCategoryRequest request = new PriceCategoryRequest();


        request.setId(entity.getId());
        request.setName(entity.getName());
        request.setPrice(entity.getPrice());
        request.setDescription(entity.getDescription());
        request.setTotalLimit(entity.getTotalLimit());
        request.setLimitPerOrder(entity.getLimitPerOrder());
        request.setHasOrderLimit(entity.isHasOrderLimit());
        request.setTicketting_id(entity.getTicketing().getId());

        if (entity.getTicketing() != null) {
            request.setTicketting_id(entity.getTicketing().getId());
        }

        return request;
    }
}