package com.tiqkis.tiqpass.domain.model;

import jakarta.persistence.*;
import lombok.*;

// Field Response Table (storing all responses as text)
@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class FieldResponse {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private CustomField customField;

    @ManyToOne
    private Ticketing ticketing;

    @ManyToOne
    private Participant participant;

    private String value;
}