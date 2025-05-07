package com.tiqkis.tiqpass.ticketting.dto;

import com.tiqkis.tiqpass.domain.model.CustomField;
import com.tiqkis.tiqpass.domain.model.PriceCategory;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class CustomFieldRequest {
    private String name;
    private String type; // "text", "number", "email", "date", "tel"
    private boolean required;
    private List<Long> priceCategoryIds; // IDs of associated price categories

    public static CustomFieldRequest fromEntity(CustomField entity) {
        CustomFieldRequest request = new CustomFieldRequest();

        request.setName(entity.getName());
        request.setType(entity.getType() != null ? entity.getType().name() : null); // enum to lowercase string
        request.setRequired(entity.isRequired());

        if (entity.getPriceCategories() != null) {
            request.setPriceCategoryIds(
                    entity.getPriceCategories().stream()
                            .map(PriceCategory::getId)
                            .collect(Collectors.toList())
            );
        }

        return request;
    }
}