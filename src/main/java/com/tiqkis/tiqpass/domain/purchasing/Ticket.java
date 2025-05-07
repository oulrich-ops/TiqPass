package com.tiqkis.tiqpass.domain.purchasing;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.threeten.bp.LocalDateTime;

import java.util.UUID;

@Entity
@AllArgsConstructor @NoArgsConstructor
@Data
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    private OrderItem orderItem;

    private LocalDateTime issuedAt;

    @Column(unique = true, nullable = false)
    private String validationCode;

    @Lob
    private byte[] qrCodeImage;

    @PrePersist
    public void prePersist() {
        this.issuedAt = LocalDateTime.now();
        if (validationCode == null || validationCode.isBlank()) {
            this.validationCode = UUID.randomUUID().toString();
        }
    }


}
