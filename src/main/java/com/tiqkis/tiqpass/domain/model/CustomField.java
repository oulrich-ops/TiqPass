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

enum FieldType {
    TEXT, NUMBER, EMAIL, DATE, TEL
}
