package com.tiqkis.tiqpass.ticketting.dto;

import lombok.Data;

import java.util.Date;

@Data

public class TicketingStatsResponse extends TicketingResponse  {


    private Integer soldTickets; // Number of tickets sold
    private Double revenue;      // Total revenue generated
    private Integer availableTickets; // Remaining tickets available

    public TicketingStatsResponse() {
        super();
    }

    public TicketingStatsResponse(Long id, String name, String location, String address, String durationType,
                                  Date startDate, Date endDate, Double minPrice, Integer totalTickets,
                                  Integer soldTickets, Double revenue, Integer availableTickets) {
        super(id, name, location, address, durationType, startDate, endDate, minPrice, totalTickets);
        this.soldTickets = soldTickets;
        this.revenue = revenue;
        this.availableTickets = availableTickets;
    }

}
