package com.tiqkis.tiqpass.domain.model;

import com.tiqkis.tiqpass.user.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String durationType;

    private String shortTextDescription;
    private String longTextDescription;
    private String banner;

    @ManyToOne
    private EventType eventType;

    @ManyToOne
    private User promoter;

    @OneToMany(mappedBy = "ticketing", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PriceCategory> priceCategories;

    @OneToMany(mappedBy = "ticketing", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CustomField> customFields;



    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private Customization customization;
}