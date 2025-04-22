package com.tiqkis.tiqpass.ticketting.dto;

import lombok.Data;

@Data
public class PriceCategoryRequest {
    private Long id;
    private Long event_id;
    private String name;
    private double price;
    private String description;
    private int totalLimit;
    private Integer limitPerOrder;
    private boolean hasOrderLimit;
}