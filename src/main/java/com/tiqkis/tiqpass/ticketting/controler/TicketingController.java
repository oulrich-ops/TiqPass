package com.tiqkis.tiqpass.ticketting.controler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tiqkis.tiqpass.common.ApiResponse;
import com.tiqkis.tiqpass.common.interfaces.ApiResponseUtil;
import com.tiqkis.tiqpass.domain.model.*;
import com.tiqkis.tiqpass.ticketting.api.TicketingApi;
import com.tiqkis.tiqpass.ticketting.dto.*;
import com.tiqkis.tiqpass.ticketting.service.TicketingService;
import com.tiqkis.tiqpass.user.model.User;
import com.tiqkis.tiqpass.user.service.IUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TicketingController implements TicketingApi {

    private final TicketingService ticketingService;
    private final IUserService userService;

    public TicketingController(TicketingService ticketingService, IUserService userService) {
        this.ticketingService = ticketingService;
        this.userService = userService;
    }

    @Override
    public ResponseEntity<ApiResponse<Long>> createEventGeneral(EventGeneralRequest request) {
        //Get current user
        User promoter =  userService.getCurrentUser();
        Long eventId = ticketingService.createEventGeneral(request, promoter);

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
    public ResponseEntity<ApiResponse<Void>> addCustomFields(Long eventId, List<CustomFieldRequest> customFields) {


        ticketingService.addCustomFields(eventId, customFields);


        ApiResponse<Void> response = ApiResponseUtil.buildApiResponse("Customization and custom fields added successfully", null, HttpStatus.OK.value());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ApiResponse<Void>> addCustomization(Long eventId, Customization request) {
        ticketingService.addCustomization(eventId, request);
        ApiResponse<Void> response = ApiResponseUtil.buildApiResponse("Customization added successfully", null, HttpStatus.OK.value());
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

    @Override
    public ResponseEntity<ApiResponse<List<TicketingResponse>>> getCurrentUserTicketingEvents() {

        Long currentUserId = Long.valueOf(userService.getCurrentUser().getId());

        List<TicketingResponse> userTicketingEvents = ticketingService.getTicketingEventsByUserId(currentUserId);

        ApiResponse<List<TicketingResponse>> response = ApiResponseUtil.buildApiResponse(
                "User's ticketing events retrieved successfully",
                userTicketingEvents,
                HttpStatus.OK.value()
        );

        if (userTicketingEvents.isEmpty()) {
            return new ResponseEntity<>(response, HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ApiResponse<WholeTicketingResponse>> getTicketingEventById(Long id) {
        WholeTicketingResponse wticketing = ticketingService.getTicketingEventById(id);

        ApiResponse<WholeTicketingResponse> response = ApiResponseUtil.buildApiResponse("Ticketing event retrieved successfully", wticketing, HttpStatus.OK.value());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ApiResponse<Void>> updateIsPublished(Long eventId, boolean isPublished) {
        ticketingService.updateIsPublished(eventId, isPublished);
        ApiResponse<Void> response = ApiResponseUtil.buildApiResponse(
                "Event publication status updated successfully", null, HttpStatus.OK.value()
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}