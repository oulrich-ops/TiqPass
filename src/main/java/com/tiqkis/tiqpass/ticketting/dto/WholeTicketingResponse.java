package com.tiqkis.tiqpass.ticketting.dto;

import com.tiqkis.tiqpass.domain.model.Customization;
import lombok.Data;

import java.util.List;

@Data
public class WholeTicketingResponse {

    private EventGeneralRequest eventGeneral;
    private List<PriceCategoryRequest> priceCategory;
    private List<CustomFieldRequest> customField;
    private Customization customization;

}
