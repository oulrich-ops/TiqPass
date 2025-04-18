package com.tiqkis.tiqpass.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomFieldValue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "custom_field_id", nullable = false)
    private CustomField customField;

    @ManyToOne
    @JoinColumn(name = "ticket_buyer_id", nullable = false)
    private TicketBuyer ticketBuyer;

    private String value; // Store the value entered by the buyer
}