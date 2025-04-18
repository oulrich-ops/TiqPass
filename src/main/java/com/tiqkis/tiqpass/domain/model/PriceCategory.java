package com.tiqkis.tiqpass.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PriceCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double price;
    private String description;
    private int totalLimit;
    private Integer limitPerOrder; // Optional field
    private boolean hasOrderLimit;

    @ManyToOne
    @JoinColumn(name = "ticketing_id")
    private Ticketing ticketing;
}