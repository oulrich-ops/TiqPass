package com.tiqkis.tiqpass.domain.model;

import com.tiqkis.tiqpass.user.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ticketing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String location;
    private String address;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String durationType;
    private Boolean isPublished = false;

    @ManyToOne
    private EventType eventType;

    @ManyToOne
    private User promoter;

    @OneToMany(mappedBy = "ticketing", cascade = CascadeType.ALL)
    private List<PriceCategory> priceCategories;

    @OneToMany(mappedBy = "ticketing", cascade = CascadeType.ALL)
    private List<CustomField> customFields;



    @OneToOne(cascade = CascadeType.ALL)
    private Customization customization;
}