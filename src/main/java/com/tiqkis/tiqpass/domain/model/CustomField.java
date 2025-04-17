package com.tiqkis.tiqpass.domain.model;

import jakarta.persistence.*;
import lombok.*;


// Custom Field System
@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class CustomField {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String label;
    private String fieldType;
    private boolean isRequired;

    @ManyToOne
    private Ticketing ticketing;
}