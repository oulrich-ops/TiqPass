package com.tiqkis.tiqpass.ticketting.dto;

import com.tiqkis.tiqpass.domain.model.EventType;
import lombok.Data;

import java.util.Date;

@Data
public class EventGeneralRequest {
    private String name;
    private EventType type;
    private String location;
    private String address;
    private String durationType; // "no_duration", "duration", "multiple_days"
    private Date startDate;
    private Date endDate;
}