package com.tiqkis.tiqpass.ticketting.api;

import com.tiqkis.tiqpass.common.ApiResponse;
import com.tiqkis.tiqpass.domain.model.Customization;
import com.tiqkis.tiqpass.ticketting.dto.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.tiqkis.tiqpass.domain.model.EventType;

import java.util.List;

@CrossOrigin(value = "*")
@RequestMapping("/ticketing")
public interface TicketingApi {

    // Step 1: Create general event information
    @PostMapping("/create-event")
    ResponseEntity<ApiResponse<Long>> createEventGeneral(@RequestBody EventGeneralRequest request);


    // Step 2: Add price categories to the event
    @PostMapping("/{eventId}/add-price-categories")
    ResponseEntity<ApiResponse<Void>> addPriceCategories(
            @PathVariable Long eventId,
            @RequestBody List<PriceCategoryRequest> priceCategories
    );


    // Step 3: Add customization and custom fields
    @PostMapping("/{eventId}/customize-fields")
    ResponseEntity<ApiResponse<Void>> addCustomFields(
            @PathVariable Long eventId,
            @RequestBody List<CustomFieldRequest> customFields
    );

    @PostMapping("/{eventId}/customize")
    ResponseEntity<ApiResponse<Void>> addCustomization(
            @PathVariable Long eventId,
            @RequestBody Customization request
    );

    @GetMapping("/{id}")
    ResponseEntity<ApiResponse<WholeTicketingResponse>> getTicketingEventById(@PathVariable Long id);

    // Retrieve all event types
    @GetMapping("/event-types")
    ResponseEntity<ApiResponse<List<EventType>>> getEventTypes();

    // Retrieve the list of all ticketing events
    @GetMapping("/list")
    ResponseEntity<ApiResponse<List<TicketingResponse>>> getAllTicketingEvents();

    // Update a ticketing event general information
    @PutMapping("/{eventId}/update")
    ResponseEntity<ApiResponse<Void>> updateTicketingEvent(
            @PathVariable Long eventId,
            @RequestBody EventGeneralRequest request
    );

    // Delete a ticketing event
    @DeleteMapping("/{eventId}/delete")
    ResponseEntity<ApiResponse<Void>> deleteTicketingEvent(@PathVariable Long eventId);

    @GetMapping("/my-ticketing-events")
    ResponseEntity<ApiResponse<List<TicketingResponse>>> getCurrentUserTicketingEvents();

    @PutMapping("/{eventId}/publish")
    ResponseEntity<ApiResponse<Void>> updateIsPublished(
            @PathVariable Long eventId,
            @RequestParam boolean isPublished
    );

    @GetMapping("/published-events")
    ResponseEntity<ApiResponse<List<TicketingResponse>>> getPublishedTicketingEvents();

}