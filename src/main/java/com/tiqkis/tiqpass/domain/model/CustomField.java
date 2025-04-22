package com.tiqkis.tiqpass.domain.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;


// Custom Field System
@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class CustomField {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private FieldType type; // Enum for field types

    @Column(name = "required", nullable = false)
    private boolean required;

    @ManyToOne
    @JoinColumn(name = "ticketing_id")
    private Ticketing ticketing;

    @ManyToMany
    @JoinTable(
            name = "custom_field_price_category",
            joinColumns = @JoinColumn(name = "custom_field_id"),
            inverseJoinColumns = @JoinColumn(name = "price_category_id")
    )
    private List<PriceCategory> priceCategories;
}

