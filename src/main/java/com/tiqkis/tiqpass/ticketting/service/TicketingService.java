package com.tiqkis.tiqpass.ticketting.service;

import com.tiqkis.tiqpass.domain.model.Customization;
import com.tiqkis.tiqpass.ticketting.dto.*;
import com.tiqkis.tiqpass.domain.model.EventType;
import com.tiqkis.tiqpass.user.model.User;

import java.util.List;

public interface TicketingService {
    Long createEventGeneral(EventGeneralRequest request, User user);
    void addPriceCategories(Long eventId, List<PriceCategoryRequest> priceCategories);
    void addCustomization(Long eventId, Customization request);
    void addCustomFields(Long eventId, List<CustomFieldRequest> customFields);
    List<EventType> getEventTypes();
    List<TicketingResponse> getAllTicketingEvents();
    void updateTicketingEvent(Long eventId, EventGeneralRequest request);
    void deleteTicketingEvent(Long eventId);
    List<TicketingResponse> getTicketingEventsByUserId(Long id);
}