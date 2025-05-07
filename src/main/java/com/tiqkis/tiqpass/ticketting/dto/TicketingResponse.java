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
    private Date endDate;
    private String bannerUrl ;
    private Boolean isPublished;
}