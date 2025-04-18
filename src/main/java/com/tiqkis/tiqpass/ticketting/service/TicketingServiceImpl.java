package com.tiqkis.tiqpass.ticketting.service;

import com.tiqkis.tiqpass.common.DateUtils;
import com.tiqkis.tiqpass.domain.model.*;
import com.tiqkis.tiqpass.ticketting.dto.*;
import com.tiqkis.tiqpass.domain.model.Ticketing;
import com.tiqkis.tiqpass.ticketting.repository.EventTypeRepository;
import com.tiqkis.tiqpass.ticketting.repository.TicketingRepository;
import com.tiqkis.tiqpass.ticketting.service.TicketingService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public  class TicketingServiceImpl implements TicketingService {

    private final TicketingRepository ticketingRepository;
    private final EventTypeRepository eventTypeRepository;

    public TicketingServiceImpl(TicketingRepository ticketingEventRepository, EventTypeRepository eventTypeRepository) {
        this.ticketingRepository = ticketingEventRepository;
        this.eventTypeRepository = eventTypeRepository;
    }

    @Override
    public Long createEventGeneral(EventGeneralRequest request) {
        Ticketing event = new Ticketing();
        event.setName(request.getName());
        event.setEventType(request.getType());
        event.setLocation(request.getLocation());
        event.setAddress(request.getAddress());
        event.setDurationType(request.getDurationType());
        event.setStartDate(DateUtils.convertToLocalDate(request.getStartDate()));
        event.setEndDate(DateUtils.convertToLocalDate(request.getEndDate()!=null ? request.getEndDate() : request.getStartDate()));
        ticketingRepository.save(event);
        return event.getId();
    }

    @Override
    public void addPriceCategories(Long eventId, List<PriceCategoryRequest> priceCategories) {
        Ticketing event = ticketingRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));
        // Logic to add price categories to the event
        // Example: event.addPriceCategories(priceCategories);

        List<PriceCategory> categories = priceCategories.stream()
                .map(request -> {
                    PriceCategory category = new PriceCategory();
                    category.setName(request.getName());
                    category.setPrice(request.getPrice());
                    category.setTicketing(event); // Associate with the event
                    return category;
                })
                .toList();

        event.getPriceCategories().addAll(categories); // Add to the event's list

        ticketingRepository.save(event);
    }

    @Override
    public void addCustomization(Long eventId, CustomizationAndFieldsRequest request) {
        Ticketing event = ticketingRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));
        // Logic to add customization and custom fields
        // Example: event.setCustomization(request.getCustomization());

        Customization customization = request.getCustomization();

        event.setCustomization(customization);
        event.setCustomization(
                request.getCustomization());
        //event.setCustomFields(request.getCustomFields());

        ticketingRepository.save(event);
    }

    @Override
    public void addCustomFields(Long eventId, List<CustomFieldRequest> customFields) {

    }

    @Override
    public List<EventType> getEventTypes() {
        return eventTypeRepository.findAll();
    }

    @Override
    public List<TicketingResponse> getAllTicketingEvents() {
        return ticketingRepository.findAll().stream()
                .map(event -> {
                    TicketingResponse response = new TicketingResponse();
                    response.setId(event.getId());
                    response.setName(event.getName());
                    response.setLocation(event.getLocation());
                    response.setAddress(event.getAddress());
                    response.setDurationType(event.getDurationType());
                    response.setStartDate(DateUtils.convertToDate(event.getStartDate()));
                    response.setEndDate(DateUtils.convertToDate(event.getEndDate()));
                    return response;
                })
                .collect(Collectors.toList());
    }

    @Override
    public void updateTicketingEvent(Long eventId, EventGeneralRequest request) {
        Ticketing event = ticketingRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));
        event.setName(request.getName());
        event.setLocation(request.getLocation());
        event.setAddress(request.getAddress());
        event.setDurationType(request.getDurationType());
        event.setStartDate(DateUtils.convertToLocalDate(request.getStartDate()));
        event.setEndDate(DateUtils.convertToLocalDate(request.getEndDate()));
        ticketingRepository.save(event);
    }

    @Override
    public void deleteTicketingEvent(Long eventId) {
        ticketingRepository.deleteById(eventId);
    }
}