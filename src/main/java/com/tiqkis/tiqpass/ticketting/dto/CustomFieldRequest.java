package com.tiqkis.tiqpass.ticketting.dto;

import lombok.Data;

import java.util.List;

@Data
public class CustomFieldRequest {
    private String name;
    private String type; // "text", "number", "email", "date", "tel"
    private boolean required;
    private List<Long> priceCategoryIds; // IDs of associated price categories
}