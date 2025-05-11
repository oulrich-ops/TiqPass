package com.tiqkis.tiqpass.ticketting.dto;

import com.tiqkis.tiqpass.common.DateUtils;
import com.tiqkis.tiqpass.domain.model.EventType;
import com.tiqkis.tiqpass.domain.model.Ticketing;
import lombok.Data;

import java.time.LocalTime;
import java.util.Date;

@Data
public class EventGeneralRequest {
    private Integer id;
    private String name;
    private EventType type;
    private String location;
    private String address;
    private String durationType; // "no_duration", "duration", "multiple_days"
    private Date startDate;
    private Date endDate;
    private String startTime;
    private String endTime;
    private Boolean isPublished;
    private Integer totalTickets;

    public static EventGeneralRequest fromEntity(Ticketing event) {
        EventGeneralRequest request = new EventGeneralRequest();

        request.setId(event.getId() != null ? event.getId().intValue() : null);
        request.setName(event.getName());
        request.setType(event.getEventType());
        request.setLocation(event.getLocation());
        request.setAddress(event.getAddress());
        request.setDurationType(event.getDurationType());

        request.setStartDate(DateUtils.convertToDate(event.getStartDate()));
        request.setEndDate(DateUtils.convertToDate(event.getEndDate()));
        request.setStartTime(event.getStartTime() != null ? event.getStartTime().toString() : null);
        request.setEndTime(event.getEndTime() != null ? event.getEndTime().toString() : null);

        return request;
    }

    public Ticketing toEntity() {
        Ticketing event = new Ticketing();

        if (this.id != null) {
            event.setId(Long.valueOf(this.id));
        }

        event.setName(this.name);
        event.setEventType(this.type);
        event.setLocation(this.location);
        event.setAddress(this.address);
        event.setDurationType(this.durationType);

        event.setStartDate(this.startDate != null ? DateUtils.convertToLocalDate(this.startDate) : null);
        event.setEndDate(this.endDate != null ? DateUtils.convertToLocalDate(this.endDate) : null);

        event.setStartTime(this.startTime != null ? LocalTime.parse(this.startTime) : null);
        event.setEndTime(this.endTime != null ? LocalTime.parse(this.endTime) : null);

        return event;
    }

}