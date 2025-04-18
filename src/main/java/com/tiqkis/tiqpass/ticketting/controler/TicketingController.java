package com.tiqkis.tiqpass.ticketting.controler;

import com.tiqkis.tiqpass.common.ApiResponse;
import com.tiqkis.tiqpass.common.Config.JwtAuthenticationResponse;
import com.tiqkis.tiqpass.common.interfaces.ApiResponseUtil;
import com.tiqkis.tiqpass.ticketting.api.TicketingApi;
import com.tiqkis.tiqpass.ticketting.dto.*;
import com.tiqkis.tiqpass.domain.model.EventType;
import com.tiqkis.tiqpass.ticketting.service.TicketingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TicketingController implements TicketingApi {

    private final TicketingService ticketingService;

    public TicketingController(TicketingService ticketingService) {
        this.ticketingService = ticketingService;
    }

    @Override
    public ResponseEntity<ApiResponse<Long>> createEventGeneral(EventGeneralRequest request) {
        Long eventId = ticketingService.createEventGeneral(request);

        ApiResponse<Long> response = ApiResponseUtil.buildApiResponse("Evenement creé avec succès !",eventId, HttpStatus.OK.value());

        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @Override
    public ResponseEntity<ApiResponse<Void>> addPriceCategories(Long eventId, List<PriceCategoryRequest> priceCategories) {
        ticketingService.addPriceCategories(eventId, priceCategories);
        ApiResponse<Void> response = ApiResponseUtil.buildApiResponse("Price categories added successfully", null, HttpStatus.OK.value());

    return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ApiResponse<Void>> addCustomizationAndFields(Long eventId, CustomizationAndFieldsRequest request) {
        //ticketingService.addCustomizationAndFields(eventId, request);

        ApiResponse<Void> response = ApiResponseUtil.buildApiResponse("Customization and custom fields added successfully", null, HttpStatus.OK.value());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ApiResponse<List<EventType>>> getEventTypes() {
        List<EventType> eventTypes = ticketingService.getEventTypes();
        if (eventTypes.isEmpty()) {
            ApiResponse<List<EventType>> response = ApiResponseUtil.buildApiResponse("No event types found", null, HttpStatus.NO_CONTENT.value());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        ApiResponse<List<EventType>> response = ApiResponseUtil.buildApiResponse("Event types retrieved successfully", eventTypes, HttpStatus.OK.value());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ApiResponse<List<TicketingResponse>>> getAllTicketingEvents() {
        List<TicketingResponse> ticketingEvents = ticketingService.getAllTicketingEvents();

        ApiResponse<List<TicketingResponse>> response = ApiResponseUtil.buildApiResponse("Ticketing events retrieved successfully", ticketingEvents, HttpStatus.OK.value());
        if (ticketingEvents.isEmpty()) {
            return new ResponseEntity<>(response, HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ApiResponse<Void>> updateTicketingEvent(Long eventId, EventGeneralRequest request) {
        ticketingService.updateTicketingEvent(eventId, request);
        ApiResponse<Void> response = ApiResponseUtil.buildApiResponse("Ticketing event updated successfully", null, HttpStatus.OK.value());
        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @Override
    public ResponseEntity<ApiResponse<Void>> deleteTicketingEvent(Long eventId) {
        ticketingService.deleteTicketingEvent(eventId);

        ApiResponse <Void> response = ApiResponseUtil.buildApiResponse("Ticketing event deleted successfully", null, HttpStatus.OK.value());
        return new ResponseEntity<>(response, HttpStatus.OK);

    }
}