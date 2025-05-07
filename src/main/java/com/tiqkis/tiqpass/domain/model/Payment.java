package com.tiqkis.tiqpass.domain.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

// Payment
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Participant participant;

    @ManyToOne(optional = false)
    private Payer payer;
    private String stripeSessionId;

    private BigDecimal amount;
    private String currency;
    private String paymentMethod;
    private String status;
    private String paymentReference;
    private LocalDateTime datePaiement = LocalDateTime.now();
}