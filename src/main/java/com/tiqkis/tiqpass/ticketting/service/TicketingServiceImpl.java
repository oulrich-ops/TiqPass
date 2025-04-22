package com.tiqkis.tiqpass.ticketting.service;

import com.tiqkis.tiqpass.common.DateUtils;
import com.tiqkis.tiqpass.domain.model.*;
import com.tiqkis.tiqpass.ticketting.dto.*;
import com.tiqkis.tiqpass.domain.model.Ticketing;
import com.tiqkis.tiqpass.ticketting.repository.EventTypeRepository;
import com.tiqkis.tiqpass.ticketting.repository.PriceCategoryRepository;
import com.tiqkis.tiqpass.ticketting.repository.TicketingRepository;
import com.tiqkis.tiqpass.ticketting.service.TicketingService;
import com.tiqkis.tiqpass.user.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public  class TicketingServiceImpl implements TicketingService {

    private final TicketingRepository ticketingRepository;
    private final EventTypeRepository eventTypeRepository;
    private final PriceCategoryRepository priceCategoryRepository;

    public TicketingServiceImpl(TicketingRepository ticketingEventRepository, EventTypeRepository eventTypeRepository
    , PriceCategoryRepository priceCategoryRepository) {
        this.ticketingRepository = ticketingEventRepository;
        this.eventTypeRepository = eventTypeRepository;
        this.priceCategoryRepository = priceCategoryRepository;
    }

    @Override
    public Long createEventGeneral(EventGeneralRequest request, User user) {
        Ticketing event = new Ticketing();
        event.setPromoter(user);
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


        List<PriceCategory> categories = priceCategories.stream()
                .map(request -> {
                    PriceCategory category;

                    if (request.getId() != null) {
                        category = priceCategoryRepository.findById(request.getId())
                                .orElse(new PriceCategory());
                    } else {
                        category = new PriceCategory();
                    }
                    category.setDescription(request.getDescription());
                    category.setName(request.getName());
                    category.setPrice(request.getPrice());
                    category.setTicketing(event);
                    return category;
                })
                .toList();
        event.getPriceCategories().clear();
        event.getPriceCategories().addAll(categories); // Add to the event's list

        ticketingRepository.save(event);
    }

    @Override
    public void addCustomization(Long eventId, Customization request) {

        Ticketing event = ticketingRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));

        event.setCustomization(request);

        ticketingRepository.save(event);
    }

    @Override
    public void addCustomFields(Long eventId, List<CustomFieldRequest> customFields) {
        Ticketing event = ticketingRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));



        List<CustomField> fields = customFields.stream()
                .map(request -> {
                    CustomField field = new CustomField();
                    field.setName(request.getName());
                    field.setRequired(request.isRequired());
                    field.setType(FieldType.valueOf(request.getType()));
                    field.setTicketing(event); // Associate the field with the event
                    return field;
                })
                .toList();

        event.getCustomFields().clear();
        event.getCustomFields().addAll(fields);

        ticketingRepository.save(event);

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

    public List<TicketingResponse> getTicketingEventsByUserId(Long userId) {
        return ticketingRepository.findByUserId(userId).stream()
                .map(event -> {
                    TicketingResponse response = new TicketingResponse();
                    response.setId(event.getId());
                    response.setName(event.getName());
                    response.setLocation(event.getLocation());
                    response.setAddress(event.getAddress());
                    response.setDurationType(event.getDurationType());
                    response.setStartDate(DateUtils.convertToDate(event.getStartDate()));
                    response.setEndDate(DateUtils.convertToDate(event.getEndDate()));
                    response.setBannerUrl(event.getBanner());
                    return response;
                })
                .collect(Collectors.toList());
    }
}