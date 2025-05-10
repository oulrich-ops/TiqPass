package com.tiqkis.tiqpass.ticketting.dto;

import lombok.Data;

import java.util.Date;

@Data
public class TicketingResponse {
    private Long id;
    private String name;
    private String location;
    private String address;
    private String durationType;
    private Date startDate;
    private Double minPrice;
    private Date endDate;
    private String bannerUrl ;
    private Boolean isPublished;

    public  TicketingResponse (){
    }

    public TicketingResponse(Long id, String name, String location, String address, String durationType, Date startDate, Date endDate, Double minPrice) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.address = address;
        this.durationType = durationType;
        this.startDate = startDate;
        this.endDate = endDate;
        this.minPrice = minPrice;
    }
}