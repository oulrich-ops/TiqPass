package com.tiqkis.tiqpass.ticketting.dto;

import com.tiqkis.tiqpass.domain.model.Customization;
import lombok.Data;

import java.util.List;

@Data
public class CustomizationAndFieldsRequest {
    private Customization customization;
    private List<CustomFieldRequest> customFields;
}