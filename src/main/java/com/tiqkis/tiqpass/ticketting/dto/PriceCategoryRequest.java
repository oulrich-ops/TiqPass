package com.tiqkis.tiqpass.ticketting.dto;

import lombok.Data;

@Data
public class PriceCategoryRequest {
    private String name;
    private double price;
    private String description;
    private int totalLimit;
    private Integer limitPerOrder; // Optional
    private boolean hasOrderLimit;
}